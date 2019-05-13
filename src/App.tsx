import React, * as react from 'react';
import './App.css';
import { UserAgentApplication } from 'msal';
import { appId, scopes } from './Config';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './Components/NavBar';
import { Container, Row, Col } from 'reactstrap';
import SubmitForm from './Components/SubmitForm';

class App extends react.Component<{}, { isAuthenticated: boolean }> {
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
      isAuthenticated: (user !== null)
    };

    if (user) {
      this.LoadData()
    }
    this.submitForm = React.createRef();
  }
  render() {
    return (
      <div>
        <NavBar isAuthenticated={this.state.isAuthenticated}
          authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
          user={{}} />
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
      //await this.getUserProfile();
    }
    catch (err) {
      var errParts = err.split('|');
      this.setState({
        isAuthenticated: false,
        //user: {},
        //error: { message: errParts[1], debug: errParts[0] }
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  private LoadData() {
    //this.getUserProfile();
  }
}

export default App;

