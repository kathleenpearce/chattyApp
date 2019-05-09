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
      notifications: [] // messages coming from the server will be stored here as they arrive
    };
  this.updateName = this.updateName.bind(this)


 }

 componentDidMount() {
   const connection = new WebSocket("ws://localhost:3001");
   this.setState({connection})

   connection.onmessage = (event) => {
    console.log("message from server", event.data)

      console.log(event.data);
      const data = JSON.parse(event.data);

      switch(data.type) {
      case "incomingMessage":
        this.setState({messages: this.state.messages.concat(data)});

        break;
      case "incomingNotification":
        this.setState({notifications: this.state.notifications.concat(data)});
        break;
      default:
        console.log("error!")
        console.log(data.type)
        //throw new Error("Unknown event type " + data.type);
    }

   }

   // console.log("Connected to server")
   // console.log("componentDidMount <App />");
 //   setTimeout(() => {
 //     console.log("Simulating incoming message");
 //     // Add a new message to the list of messages in the data store
 //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
 //     const messages = this.state.messages.concat(newMessage)
 //     // Update the state of the app component.
 //     // Calling setState will trigger a call to render() in App and all child components.
 //     this.setState({messages: messages})
 //   }, 3000);
 // }
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
     </nav>

     <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
     <ChatBar currentUser={this.state.currentUser} onKeyPress={this.onKeyPress} addNewMessage={this.addNewMessage} updateName={this.updateName} />
     </div>

   );
 }
}
