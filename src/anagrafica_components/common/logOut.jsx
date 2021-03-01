import { Component } from "react";
class LogOut extends Component {
  componentDidMount() {
    localStorage.removeItem("TOKEN");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default LogOut;
