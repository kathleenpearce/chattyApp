import React,{Component} from 'react';

function Chatbar(props) {
  const onKeyPress = (event => {
     if (event.key === 'Enter') {
     props.addNewMessage(event.target.value);
     }
   })


const onKeyPressName = (event => {
     if (event.key === 'Enter') {
      props.updateName(event.target.value);
     }
   })
  console.log('props', props)
  console.log('props', props.username)


    return(
      <footer className="chatbar">
      <input className="chatbar-username" placeholder='something' onKeyPress={onKeyPressName} value={props.username} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} value={props.content} />
      </footer>
    )

}
export default Chatbar;
