// collection user information after user first login
// have no wireframe

import React, { Component } from 'react';
import categories from '.././category.json';
import api from '../../api';
import {Button, Container,ListGroup,ListGroupItem} from "reactstrap";

class FirstTimeLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: categories[0].category,
      result: [],
      count: 0
    }
  }

  checked(e){
    let preResult = this.state.result.slice();
    let preCount = this.state.count;
    if(e.target.checked && this.state.count < 5){
      preResult.push(e.target.name) 
      this.setState({
        result: preResult,
        count : preCount + 1,
      })
    } else if(!e.target.checked){
      let idx = preResult.indexOf(e.target.name);
      preResult.splice(idx, 1);
      this.setState({
        result: preResult,
        count: preCount - 1
      })
    } else {
      e.preventDefault();
    }
  }

  finalSubmit(e){
    e.preventDefault();
    var curlikes = this.state.result.slice();
    curlikes = curlikes.join(",")
    api.postLiks({likes: curlikes}).then(result => {
      console.log('SUCCESS!')
      this.props.history.push("/")})
  }

  render() {                
    return (
      <div className="favoriatePage">
        <h3 style={{marginTop:"30px"}} className='character'>Choose your favorite category</h3>
        {this.state.count === 5 && (<h3 className='character'>you could only choose 5 type</h3>)}
        <form onSubmit={(e)=>this.finalSubmit(e)}>
        <Container>
        
        <ListGroup >
            {this.state.category.map((category, i) => (
               <ListGroupItem key={i} style= {{textAlign:"left", border:"none", width:"50%", margin: "0 auto"}}>
                  <input type="checkbox" id={category} name={category} onClick={(e) =>this.checked(e)} /> {"  "}
                  <label for={category} className="label">{category}</label>
                </ListGroupItem>
            
            ))}
          
        </ListGroup>
          <Button type="submit" className='character' style={{backgroundColor:"#596e79", margin:"10px ", border: "1px solid #596e79"}}>Skip</Button>
          <Button type="submit" className='character' style={{backgroundColor:"#596e79", margin:"10px ", border: "1px solid #596e79"}}>Submit</Button>
          
        </Container>

        </form>
      </div>
    );
  }

}

export default FirstTimeLogin;
