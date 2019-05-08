import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./Chatbar.jsx";
import messages from "../messages.json"


export default class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     currentUser: "Anonymous",
     messages: messages
   };


 }

 componentDidMount() {
   console.log("componentDidMount <App />");
   setTimeout(() => {
     console.log("Simulating incoming message");
     // Add a new message to the list of messages in the data store
     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
     const messages = this.state.messages.concat(newMessage)
     // Update the state of the app component.
     // Calling setState will trigger a call to render() in App and all child components.
     this.setState({messages: messages})
   }, 3000);
 }



  addNewMessage = (content) => {
    const newMessage = { username: this.state.currentUser, content:content };
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }



 render() {
   return (
     <div>
     <nav className="navbar">
       <a href="/" className="navbar-brand">Chatty</a>
     </nav>
     <MessageList messages={this.state.messages}/>
     <ChatBar currentUser={this.state.currentUser} onKeyPress={this.onKeyPress} addNewMessage={this.addNewMessage} />
     </div>

   );
 }
}