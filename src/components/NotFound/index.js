import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

const NotFoundContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`
const NotFoundView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 20px;
  text-align: center;
`
const NotFoundImage = styled.img`
  width: 300px;
  @media (min-width: 768px) {
    width: 450px;
  }
`
const NotFoundHeading = styled.h1`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-family: 'Roboto';
  font-size: 24px;
  margin-top: 30px;
`
const NotFoundDesc = styled.p`
  color: ${props => (props.darkMode ? '#64748b' : '#475569')};
  font-family: 'Roboto';
  font-size: 16px;
`

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundImageUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <NotFoundContainer darkMode={isDarkTheme}>
          <Header />
          <ContentWrapper>
            <Sidebar />
            <NotFoundView>
              <NotFoundImage src={notFoundImageUrl} alt="not found" />
              <NotFoundHeading darkMode={isDarkTheme}>
                Page Not Found
              </NotFoundHeading>
              <NotFoundDesc darkMode={isDarkTheme}>
                we are sorry, the page you requested could not be found.
              </NotFoundDesc>
            </NotFoundView>
          </ContentWrapper>
        </NotFoundContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
