import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import styled from 'styled-components'

import NxtWatchContext from '../../context/NxtWatchContext'

// --- Styled Components with Fixed Logic (No Nested Ternaries) ---
const SidebarContainer = styled.div`
  width: 20%;
  height: 90vh;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.darkMode ? '#212121' : '#ffffff')};
  @media (min-width: 768px) {
    display: flex;
  }
`
const NavOptions = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 20px;
`
const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => {
    if (props.isActive) {
      return props.darkMode ? '#383838' : '#f1f5f9'
    }
    return 'transparent'
  }};
  color: ${props => {
    if (props.isActive) {
      return '#ff0000'
    }
    return props.darkMode ? '#ffffff' : '#000000'
  }};
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`
const NavText = styled.p`
  margin-left: 15px;
  color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
  font-family: 'Roboto';
`
const ContactSection = styled.div`
  padding: 20px;
`
const ContactHeading = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-weight: bold;
  font-size: 16px;
`
const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
`
const SocialImage = styled.img`
  width: 30px;
  height: 30px;
`
const ContactDesc = styled.p`
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  font-size: 14px;
  margin-top: 20px;
  line-height: 1.5;
`

class Sidebar extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme, activeTab, changeTab} = value

          return (
            <SidebarContainer darkMode={isDarkTheme}>
              <NavOptions>
                <NavLink
                  to="/"
                  isActive={activeTab === 'Home'}
                  darkMode={isDarkTheme}
                  onClick={() => changeTab('Home')}
                >
                  <AiFillHome size={20} />
                  <NavText darkMode={isDarkTheme}>Home</NavText>
                </NavLink>

                <NavLink
                  to="/trending"
                  isActive={activeTab === 'Trending'}
                  darkMode={isDarkTheme}
                  onClick={() => changeTab('Trending')}
                >
                  <HiFire size={20} />
                  <NavText darkMode={isDarkTheme}>Trending</NavText>
                </NavLink>

                <NavLink
                  to="/gaming"
                  isActive={activeTab === 'Gaming'}
                  darkMode={isDarkTheme}
                  onClick={() => changeTab('Gaming')}
                >
                  <SiYoutubegaming size={20} />
                  <NavText darkMode={isDarkTheme}>Gaming</NavText>
                </NavLink>

                <NavLink
                  to="/saved-videos"
                  isActive={activeTab === 'Saved Videos'}
                  darkMode={isDarkTheme}
                  onClick={() => changeTab('Saved Videos')}
                >
                  <BiListPlus size={20} />
                  <NavText darkMode={isDarkTheme}>Saved Videos</NavText>
                </NavLink>
              </NavOptions>

              <ContactSection>
                <ContactHeading darkMode={isDarkTheme}>
                  CONTACT US
                </ContactHeading>
                <SocialIcons>
                  <SocialImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <SocialImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <SocialImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </SocialIcons>
                <ContactDesc darkMode={isDarkTheme}>
                  Enjoy! Now to see your channels and recommendations!
                </ContactDesc>
              </ContactSection>
            </SidebarContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Sidebar
