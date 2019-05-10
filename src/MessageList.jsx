import React,{Component} from 'react';
import Message from './Message.jsx';

function MessageList (props){
  const listMessages = props.messages.map(((message, i) =>
  <Message message={message} key={message.id}/>
));

const listNotifications = props.notifications.map(((notification, i) =>
  <p className="notification" key={i} >{notification.content}</p>
));
  return(
    <div>
    <main className="messages">
    {listMessages}
    </main>
    {listNotifications}
    </div>
  )
}

export default MessageList;