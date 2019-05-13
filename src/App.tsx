import React, * as react from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './Components/NavBar';
import { Container, Row, Col } from 'reactstrap';
import SubmitForm from './Components/SubmitForm';

class App extends react.Component {
  submitForm: react.RefObject<SubmitForm>;
  constructor(props: any) {
    super(props);
    this.submitForm = React.createRef();
  }
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col>
              <SubmitForm  ref={this.submitForm} ></SubmitForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

