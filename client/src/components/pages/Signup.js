import React, { Component } from 'react';
import api from '../../api';
import {Container, Col, Button, Form, FormGroup, Label, Input, Jumbotron} from 'reactstrap';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      message: null,
      isShowImage: false,
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        // this.props.history.push("/") // Redirect to the home page
        this.props.history.push("/firstlogin") // Redirect to the home page
        this.setState({
          isShowImage: true,
        })
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        {/* <h2>Signup</h2> */}
        <Container >
        <Jumbotron style={{margin:"50px"}}>
       
        <Form>
          <FormGroup row>
          <Label for="exampleEmail" className = 'character' sm={2}>Username</Label>
          <Col sm={10}>
            <Input className = 'character' type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label className = 'character' for="exampleEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input className = 'character' type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label className = 'character' for="exampleEmail" sm={2}>Password</Label>
          <Col sm={10}>
            <Input className = 'character' type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
          </Col>
          </FormGroup>
          <FormGroup check row>
          <Col style={{textAlign : "center"}}>
            <Button className = 'character' onClick={(e) => this.handleClick(e)}>Next</Button>
          </Col>
        </FormGroup>
        </Form>
          {this.state.message && <div className="info info-danger character">
          {this.state.message}
          </div>}
       
        </Jumbotron>
        </Container>
      
      </div>
    );
  }
}

export default Signup;
