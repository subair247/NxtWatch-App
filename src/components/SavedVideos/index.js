import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoCard from '../VideoCard'

const SavedContainer = styled.div`
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
  height: 90vh;
  overflow-y: auto;
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
const VideosList = styled.ul`
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const NoSavedView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`
const NoSavedImage = styled.img`
  width: 50%;
  max-width: 450px;
  margin-bottom: 20px;
`
const NoSavedHeading = styled.h1`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  margin-bottom: 10px;
`
const NoSavedDesc = styled.p`
  color: ${props => (props.darkMode ? '#64748b' : '#475569')};
  font-family: 'Roboto';
`

class SavedVideos extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value
          return (
            <SavedContainer darkMode={isDarkTheme} data-testid="savedVideos">
              <Header />
              <ContentWrapper>
                <Sidebar />
                <MainContent>
                  {savedVideos.length > 0 ? (
                    <>
                      <BannerSection
                        darkMode={isDarkTheme}
                        data-testid="banner"
                      >
                        <IconContainer darkMode={isDarkTheme}>
                          <BiListPlus size={30} color="#ff0000" />
                        </IconContainer>
                        <BannerTitle darkMode={isDarkTheme}>
                          Saved Videos
                        </BannerTitle>
                      </BannerSection>
                      <VideosList>
                        {savedVideos.map(video => (
                          <VideoCard
                            key={video.id}
                            videoDetails={video}
                            isList
                          />
                        ))}
                      </VideosList>
                    </>
                  ) : (
                    <NoSavedView>
                      <NoSavedImage
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <NoSavedHeading darkMode={isDarkTheme}>
                        No saved videos found
                      </NoSavedHeading>
                      <NoSavedDesc darkMode={isDarkTheme}>
                        You can save your videos while watching them
                      </NoSavedDesc>
                    </NoSavedView>
                  )}
                </MainContent>
              </ContentWrapper>
            </SavedContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default SavedVideos
