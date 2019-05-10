import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
import messages from "../messages.json"
const uuidv1 = require("uuid/v1")


export default class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
    currentUser: "anon",
    messages: [],
    notifications: [],
    clientUpdate: []
  };
    this.updateName = this.updateName.bind(this)
}


componentDidMount() {
  const connection = new WebSocket("ws://localhost:3001");
  this.setState({connection})

  connection.onmessage = (event) => {
    console.log("message from server", event.data)

    const data = JSON.parse(event.data);
    switch(data.type) {

      case "incomingMessage":
      this.setState({messages: this.state.messages.concat(data)});
      break;

      case "incomingNotification":
      this.setState({notifications: this.state.notifications.concat(data)});
      break;

      case "usersUpdate":{
        this.setState({clientUpdate: data.clientUpdate})

    }
      default:
        console.log("error!")
    }
  }
}


addNewMessage = (content) => {
  const newMessage = {type: "postMessage", username: this.state.currentUser, content:content };
  this.state.connection.send(JSON.stringify(newMessage));
}

updateName(name) {
  const newMessage = {type: "postNotification",  content: `${this.state.currentUser} has changed their name to ${name}`}
  this.state.connection.send(JSON.stringify(newMessage))
  this.setState({ currentUser: name})
}

render() {
  return (
    <div>
    <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <p className="user-counter">There are {this.state.clientUpdate} users online!</p>
    </nav>
    <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
    <ChatBar currentUser={this.state.currentUser} onKeyPress={this.onKeyPress} addNewMessage={this.addNewMessage} updateName={this.updateName} />
    </div>
  );
 }
}
