import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoCard from '../VideoCard'

const GamingContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`
const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 90vh;
`
const BannerSection = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f1f1f1')};
  padding: 20px 40px;
  display: flex;
  align-items: center;
`
const IconContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#000000' : '#e2e8f0')};
  border-radius: 50%;
  padding: 15px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BannerTitle = styled.h1`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: bold;
`
const GamingList = styled.ul`
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`
const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
`
const FailureImg = styled.img`
  width: 300px;
`
const FailureHeading = styled.h1`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#1e293b')};
  font-family: 'Roboto';
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

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingVideos: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
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
        viewCount: video.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoaderContainer>
  )

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
            <RetryButton onClick={this.getGamingVideos}>Retry</RetryButton>
          </FailureContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <BannerSection darkMode={isDarkTheme} data-testid="banner">
                <IconContainer darkMode={isDarkTheme}>
                  <SiYoutubegaming size={30} color="#ff0000" />
                </IconContainer>
                <BannerTitle darkMode={isDarkTheme}>Gaming</BannerTitle>
              </BannerSection>
              <GamingList>
                {gamingVideos.map(video => (
                  <VideoCard key={video.id} videoDetails={video} isGaming />
                ))}
              </GamingList>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <GamingContainer darkMode={isDarkTheme} data-testid="gaming">
              <Header />
              <ContentWrapper>
                <Sidebar />
                <MainContent>{this.renderResult()}</MainContent>
              </ContentWrapper>
            </GamingContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Gaming
