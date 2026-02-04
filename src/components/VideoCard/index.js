import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import styled from 'styled-components'
import NxtWatchContext from '../../context/NxtWatchContext'

const ListItem = styled.li`
  background: none;
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.grid ? 'column' : 'row')};
  width: ${props => (props.grid ? '100%' : '100%')};
  margin-bottom: 20px;
  @media (min-width: 576px) {
    width: ${props => (props.grid ? '45%' : '100%')};
    margin-right: ${props => (props.grid ? '20px' : '0')};
  }
  @media (min-width: 768px) {
    width: ${props => (props.grid ? '30%' : '100%')};
  }
`
const ItemLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.grid ? 'column' : 'row')};
  align-items: flex-start;
`
const ThumbnailImage = styled.img`
  width: ${props => (props.grid ? '100%' : '50%')};
  max-width: ${props => (props.grid ? '100%' : '300px')};
  height: ${props => (props.grid ? '180px' : '200px')};
  object-fit: cover;
  margin-right: ${props => (props.grid ? '0' : '20px')};
`
const VideoDetails = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: ${props => (props.grid ? '10px' : '0')};
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  display: ${props => (props.grid ? 'block' : 'none')};
`
const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
`
const Title = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 5px;
`
const ChannelName = styled.p`
  color: ${props => (props.darkMode ? '#94a3b8' : '#475569')};
  font-family: 'Roboto';
  font-size: 13px;
  margin-bottom: 5px;
`
const ViewsAndDate = styled.p`
  color: ${props => (props.darkMode ? '#94a3b8' : '#475569')};
  font-family: 'Roboto';
  font-size: 12px;
`

class VideoCard extends Component {
  render() {
    const {videoDetails, isGaming, isList} = this.props
    const {
      id,
      title,
      thumbnailUrl,
      viewCount,
      publishedAt,
      channel,
    } = videoDetails
    const isGrid = !isList

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <ListItem grid={isGrid ? 'true' : undefined}>
              <ItemLink to={`/videos/${id}`} grid={isGrid ? 'true' : undefined}>
                <ThumbnailImage
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  grid={isGrid ? 'true' : undefined}
                />
                <VideoDetails grid={isGrid ? 'true' : undefined}>
                  {!isGaming && isGrid && (
                    <ProfileImage
                      src={channel.profileImageUrl}
                      alt="channel logo"
                    />
                  )}
                  <ContentSection>
                    <Title darkMode={isDarkTheme}>{title}</Title>
                    {channel && (
                      <ChannelName darkMode={isDarkTheme}>
                        {channel.name}
                      </ChannelName>
                    )}
                    {!isGaming && (
                      <ViewsAndDate darkMode={isDarkTheme}>
                        {viewCount} views •{' '}
                        {publishedAt
                          ? formatDistanceToNow(new Date(publishedAt))
                          : ''}
                      </ViewsAndDate>
                    )}
                    {isGaming && (
                      <ViewsAndDate darkMode={isDarkTheme}>
                        {viewCount} Watching Worldwide
                      </ViewsAndDate>
                    )}
                  </ContentSection>
                </VideoDetails>
              </ItemLink>
            </ListItem>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default VideoCard
