import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

// --- Styled Components ---
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => (props.darkMode ? '#212121' : '#ffffff')};
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px
    ${props => (props.darkMode ? '#000000' : '#bfbfbf')};
  width: 90%;
  max-width: 400px;
  background-color: ${props => (props.darkMode ? '#000000' : '#ffffff')};
`
const Logo = styled.img`
  width: 150px;
  align-self: center;
  margin-bottom: 25px;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
const Label = styled.label`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.darkMode ? '#ffffff' : '#64748b')};
  margin-bottom: 5px;
  text-transform: uppercase;
`
const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 14px;
  outline: none;
  background-color: transparent;
  color: ${props => (props.darkMode ? '#ffffff' : '#475569')};
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const CheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  cursor: pointer;
`
const CheckboxLabel = styled.label`
  font-family: 'Roboto';
  font-size: 14px;
  color: ${props => (props.darkMode ? '#ffffff' : '#1e293b')};
  margin-left: 6px;
  cursor: pointer;
`
const LoginButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  cursor: pointer;
`
const ErrorMsg = styled.p`
  color: #ff0b37;
  font-family: 'Roboto';
  font-size: 12px;
  margin-top: 5px;
`

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginContainer darkMode={false}>
        <FormContainer onSubmit={this.submitForm} darkMode={false}>
          <Logo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <InputContainer>
            <Label htmlFor="username" darkMode={false}>
              USERNAME
            </Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={e => this.setState({username: e.target.value})}
              darkMode={false}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password" darkMode={false}>
              PASSWORD
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={e => this.setState({password: e.target.value})}
              darkMode={false}
            />
          </InputContainer>
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id="showPass"
              onChange={e => this.setState({showPassword: e.target.checked})}
            />
            <CheckboxLabel htmlFor="showPass" darkMode={false}>
              Show Password
            </CheckboxLabel>
          </CheckboxContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showSubmitError && <ErrorMsg>*{errorMsg}</ErrorMsg>}
        </FormContainer>
      </LoginContainer>
    )
  }
}

export default LoginForm
