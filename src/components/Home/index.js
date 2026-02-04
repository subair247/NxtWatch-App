import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoCard from '../VideoCard'

const HomeContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`
const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 90vh;
  padding: 20px;
`
const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  display: ${props => (props.display === 'flex' ? 'flex' : 'none')};
  justify-content: space-between;
  width: 100%;
  height: 250px;
`
const BannerLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const BannerLogo = styled.img`
  width: 130px;
`
const BannerText = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  color: #1e293b;
  line-height: 1.5;
`
const BannerButton = styled.button`
  background-color: transparent;
  color: #1e293b;
  border: 1px solid #1e293b;
  padding: 10px 15px;
  font-weight: 600;
  width: 130px;
`
const BannerCloseButton = styled.button`
  background: none;
  border: none;
  align-self: flex-start;
`
const SearchContainer = styled.div`
  display: flex;
  width: 90%;
  max-width: 500px;
  border: 1px solid ${props => (props.darkMode ? '#606060' : '#cccccc')};
  border-radius: 2px;
  margin: 20px 0;
`
const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 8px 15px;
  outline: none;
  background-color: transparent;
  color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
  font-family: 'Roboto';
`
const SearchButton = styled.button`
  background-color: ${props => (props.darkMode ? '#313131' : '#f1f5f9')};
  border: none;
  border-left: 1px solid ${props => (props.darkMode ? '#606060' : '#cccccc')};
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => (props.darkMode ? '#909090' : '#424242')};
`
const VideosList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`
const FailureImg = styled.img`
  width: 300px;
`
const FailureHeading = styled.h1`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#1e293b')};
  font-family: 'Roboto';
  margin-top: 20px;
`
const FailureDesc = styled.p`
  color: ${props => (props.darkMode ? '#64748b' : '#475569')};
`
const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

  renderVideosView = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return (
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkTheme} = value
            return (
              <FailureContainer>
                <FailureImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                />
                <FailureHeading darkMode={isDarkTheme}>
                  No Search results found
                </FailureHeading>
                <FailureDesc darkMode={isDarkTheme}>
                  Try different key words or remove search filter
                </FailureDesc>
                <RetryButton onClick={this.getVideos}>Retry</RetryButton>
              </FailureContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      )
    }
    return (
      <VideosList>
        {videosList.map(video => (
          <VideoCard key={video.id} videoDetails={video} />
        ))}
      </VideosList>
    )
  }

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />
            <FailureHeading darkMode={isDarkTheme}>
              Oops! Something Went Wrong
            </FailureHeading>
            <FailureDesc darkMode={isDarkTheme}>
              We are having some trouble to complete your request. Please try
              again.
            </FailureDesc>
            <RetryButton onClick={this.getVideos}>Retry</RetryButton>
          </FailureContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderHomeContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {showBanner, searchInput} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <HomeContainer darkMode={isDarkTheme} data-testid="home">
              <Header />
              <ContentContainer>
                <Sidebar />
                <MainContent>
                  {showBanner && (
                    <BannerContainer display="flex" data-testid="banner">
                      <BannerLeft>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <BannerText>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </BannerText>
                        <BannerButton>GET IT NOW</BannerButton>
                      </BannerLeft>
                      <BannerCloseButton
                        data-testid="close"
                        onClick={this.closeBanner}
                      >
                        <AiOutlineClose size={20} />
                      </BannerCloseButton>
                    </BannerContainer>
                  )}
                  <SearchContainer darkMode={isDarkTheme}>
                    <SearchInput
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                      darkMode={isDarkTheme}
                    />
                    <SearchButton
                      data-testid="searchButton"
                      onClick={this.getVideos}
                      darkMode={isDarkTheme}
                    >
                      <AiOutlineSearch size={20} />
                    </SearchButton>
                  </SearchContainer>
                  {this.renderHomeContent()}
                </MainContent>
              </ContentContainer>
            </HomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
