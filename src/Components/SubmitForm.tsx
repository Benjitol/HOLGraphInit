import React from 'react';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import Button from 'reactstrap/lib/Button';

export interface ISubmitFormState {
  peopleList: string[];
  selectedDocList: File[];
  errorMail: boolean
}




export default class SubmitForm extends React.Component<{}, ISubmitFormState> {


  constructor(props: any) {
    super(props);

    this.state = {
      peopleList: [],
      selectedDocList: [],
      errorMail: false
    };

  }

  render() {
    let error = null;
    if (this.state.errorMail) {
      error = <label color='red' >Please enter valid mail addresses</label>;
    }
    return (<Container>
      <Row>
        <Col>
          <h3>Submit documents for Translation</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Choose People</label>
        </Col>
      </Row>
      <Row>
        <Col>
          {error}
          <input type="email" className="form-control" name="email" onChange={(e) => this._onInputChange(e.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Choose Documents</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <input type="file" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>
            Submit for translation
        </Button>
        </Col>
      </Row>
    </Container>);
  }



  private _onInputChange(input: string): void {
    let inputvalid = input.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!inputvalid)
      this.setState(
        {
          errorMail: true
        }
      );
      else
      this.setState(
        {
          errorMail: false
        }
      );
  }

}


