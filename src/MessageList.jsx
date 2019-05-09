import React,{Component} from 'react';
import Message from './Message.jsx';

function MessageList (props){

    const listMessages = props.messages.map(((message, i) =>
      <Message message={message} key={message.id}/>

    ));

    return(
      <main className="messages">
      {listMessages}
      </main>
    )

}

export default MessageList;