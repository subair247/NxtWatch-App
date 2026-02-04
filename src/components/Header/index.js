import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import styled from 'styled-components'
import NxtWatchContext from '../../context/NxtWatchContext'

const NavHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => (props.darkMode ? '#212121' : '#ffffff')};
  height: 10vh;
`
const LogoImage = styled.img`
  width: 120px;
`
const ActionsContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
`
const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
`
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`
const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => (props.darkMode ? '#ffffff' : '#3b82f6')};
  color: ${props => (props.darkMode ? '#ffffff' : '#3b82f6')};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: bold;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`
const LogoutIcon = styled.button`
  background: none;
  border: none;
  color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`
const PopupContainer = styled.div`
  background-color: ${props => (props.darkMode ? '#212121' : '#ffffff')};
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => (props.darkMode ? '#ffffff' : '#00306e')};
  width: 100%;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`
const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid #64748b;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
`
const ConfirmButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
`

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <NavHeader darkMode={isDarkTheme}>
              <Link to="/">
                <LogoImage src={websiteLogo} alt="website logo" />
              </Link>
              <ActionsContainer>
                <li>
                  <ThemeButton
                    data-testid="theme"
                    darkMode={isDarkTheme}
                    onClick={toggleTheme}
                  >
                    {isDarkTheme ? (
                      <BsBrightnessHigh size={25} />
                    ) : (
                      <BsMoon size={25} />
                    )}
                  </ThemeButton>
                </li>
                <li>
                  <ProfileImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </li>
                <li>
                  <Popup
                    modal
                    trigger={
                      <LogoutButton type="button" darkMode={isDarkTheme}>
                        Logout
                      </LogoutButton>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <PopupContainer darkMode={isDarkTheme}>
                        <p>Are you sure, you want to logout</p>
                        <ButtonsContainer>
                          <CloseButton
                            type="button"
                            data-testid="closeButton"
                            onClick={() => close()}
                          >
                            Cancel
                          </CloseButton>
                          <ConfirmButton
                            type="button"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </ConfirmButton>
                        </ButtonsContainer>
                      </PopupContainer>
                    )}
                  </Popup>
                  <Popup
                    modal
                    trigger={
                      <LogoutIcon type="button" darkMode={isDarkTheme}>
                        <FiLogOut size={25} />
                      </LogoutIcon>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <PopupContainer darkMode={isDarkTheme}>
                        <p>Are you sure, you want to logout</p>
                        <ButtonsContainer>
                          <CloseButton onClick={() => close()}>
                            Cancel
                          </CloseButton>
                          <ConfirmButton onClick={this.onClickLogout}>
                            Confirm
                          </ConfirmButton>
                        </ButtonsContainer>
                      </PopupContainer>
                    )}
                  </Popup>
                </li>
              </ActionsContainer>
            </NavHeader>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
