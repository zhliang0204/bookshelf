import React, { Component } from "react";
import api from "../../api";
export default class LogginWithGoogle extends Component {
  render() {
    return <div>Loading...</div>;
  }
  componentDidMount() {
    api
      .getProfile1()
      .then(data => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }
}