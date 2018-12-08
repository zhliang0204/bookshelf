import React, { Component } from 'react';
import api from '../../api';
import {Container, Col, Button, Form, FormGroup, Label, Input, Jumbotron} from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <Container>
        <Jumbotron style={{margin:"50px"}}>
       
        <Form>
          <FormGroup row>
          <Label for="exampleEmail" sm={2} className ='character'>Username</Label>
          <Col sm={10}>
            <Input className = 'character' type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} />
          </Col>
          </FormGroup>
          <FormGroup row>
          <Label className = 'character' for="exampleEmail" sm={2}>Password</Label>
          <Col sm={10}>
            <Input className = 'character' type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
          </Col>
          </FormGroup>
          <FormGroup check row>
          <Col style={{textAlign:"center"}}>
            <Button className = 'character' onClick={(e) => this.handleClick(e)}>Login</Button>
          </Col>
        </FormGroup>

        </Form>
      
        </Jumbotron>
        </Container>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        {/* <form>
          Username: <input type="text" value={this.state.username} onChange={(e) => this.handleInputChange("username", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Login</button>
        </form> */}
        {/* {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>} */}
      </div>
    );
  }
}

export default Login;
