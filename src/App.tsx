import React, * as react from 'react';
import './App.css';
import { UserAgentApplication } from 'msal';
import { appId, scopes } from './Config';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './Components/NavBar';
import {getUserDetails} from './Services/GraphServices';
import { Container, Row, Col } from 'reactstrap';
import SubmitForm from './Components/SubmitForm';

class App extends react.Component<{}, { isAuthenticated: boolean, user:any }> {
  userAgentApplication: UserAgentApplication;
  submitForm: react.RefObject<SubmitForm>;
  constructor(props: any) {
    super(props);
    var msalConfig = {
      auth: {
        clientId: appId
      }
    };
    this.userAgentApplication = new UserAgentApplication(msalConfig);
    var user = this.userAgentApplication.getAccount();
    this.state = {
      isAuthenticated: (user !== null),
      user:{}
    };

    if (this.state.isAuthenticated) {
      this.LoadData()
    }
    this.submitForm = React.createRef();
  }
  render() {
    return (
      <div>
        <NavBar isAuthenticated={this.state.isAuthenticated}
          authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
          user={this.state.user} />
        <Container>
          <Row>
            <Col>
              <SubmitForm ref={this.submitForm} ></SubmitForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  async login() {
    try {
      var loginRequest = {
        scopes: scopes
      };
      await this.userAgentApplication.loginPopup(loginRequest);
      this.setState({
        isAuthenticated: true,
      });
      await this.getUserProfile();
    }
    catch (err) {
      this.setState({
        isAuthenticated: false,
        user: {},
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  private LoadData() {
    this.getUserProfile();
  }
  async getUserProfile() {
    try {
      var accessToken = await this.userAgentApplication.acquireTokenSilent({
        scopes: scopes
      });
      if (accessToken) {
        var user = await getUserDetails(accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName,
            avatar: user.photo
          },
        });
      }
    }
    catch (err) {
        this.setState({
        isAuthenticated: false,
        user: {},
      });
    }
  }
}

export default App;

