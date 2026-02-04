import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import styled from 'styled-components'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components ---
const VideoDetailsContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const VideoContentWrapper = styled.div`
  display: flex;
  width: 100%;
`
const VideoMainSection = styled.div`
  width: 100%;
  padding: 20px;
  height: 90vh;
  overflow-y: auto;
`
const Title = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 500;
`
const VideoStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`
const ViewsText = styled.p`
  color: ${props => (props.darkMode ? '#64748b' : '#475569')};
  font-family: 'Roboto';
  font-size: 14px;
`
const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`
const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};

  & svg {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
`
const HrLine = styled.hr`
  border: 1px solid ${props => (props.darkMode ? '#475569' : '#e2e8f0')};
  margin: 20px 0;
`
const ChannelContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`
const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
`
const ChannelName = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`
const Subscribers = styled.p`
  color: ${props => (props.darkMode ? '#64748b' : '#475569')};
  font-size: 12px;
  margin-top: 5px;
`
const Description = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#475569')};
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.6;
  margin-top: 20px;
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

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
      }
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
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
            <RetryButton onClick={this.getVideoDetails}>Retry</RetryButton>
          </FailureContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccessView = () => {
    const {videoDetails, isLiked, isDisliked} = this.state
    const {
      title,
      videoUrl,
      viewCount,
      publishedAt,
      description,
      channel,
    } = videoDetails

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme, addVideo, savedVideos} = value
          const isSaved = savedVideos.some(each => each.id === videoDetails.id)

          const onClickSave = () => {
            addVideo(videoDetails)
          }

          return (
            <div>
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="500px"
              />
              <Title darkMode={isDarkTheme}>{title}</Title>
              <VideoStatsContainer>
                <ViewsText darkMode={isDarkTheme}>
                  {viewCount} views •{' '}
                  {formatDistanceToNow(new Date(publishedAt))}
                </ViewsText>
                <ActionButtonsContainer>
                  <ActionButton
                    type="button"
                    isActive={isLiked}
                    onClick={this.onClickLike}
                  >
                    <AiOutlineLike /> Like
                  </ActionButton>
                  <ActionButton
                    type="button"
                    isActive={isDisliked}
                    onClick={this.onClickDislike}
                  >
                    <AiOutlineDislike /> Dislike
                  </ActionButton>
                  <ActionButton
                    type="button"
                    isActive={isSaved}
                    onClick={onClickSave}
                  >
                    <BiListPlus /> {isSaved ? 'Saved' : 'Save'}
                  </ActionButton>
                </ActionButtonsContainer>
              </VideoStatsContainer>
              <HrLine darkMode={isDarkTheme} />
              <ChannelContainer>
                <ProfileImage
                  src={channel.profileImageUrl}
                  alt="channel logo"
                />
                <ChannelInfo>
                  <ChannelName darkMode={isDarkTheme}>
                    {channel.name}
                  </ChannelName>
                  <Subscribers darkMode={isDarkTheme}>
                    {channel.subscriberCount} subscribers
                  </Subscribers>
                  <Description darkMode={isDarkTheme}>
                    {description}
                  </Description>
                </ChannelInfo>
              </ChannelContainer>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  // --- ERROR FIXED HERE: Moved logic into this function using Switch ---
  renderResult = () => {
    const {apiStatus} = this.state // --- ERROR FIXED HERE: Destructuring State ---

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
            <VideoDetailsContainer
              darkMode={isDarkTheme}
              data-testid="videoItemDetails"
            >
              <Header />
              <VideoContentWrapper>
                <Sidebar />
                <VideoMainSection>{this.renderResult()}</VideoMainSection>
              </VideoContentWrapper>
            </VideoDetailsContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
