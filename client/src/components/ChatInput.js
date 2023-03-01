import '../css/ChatInput.css';
import axios from "axios";

const ChatInput = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`http://${props.SERVER}:9000/new_message`, document.querySelector('#message-form'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => document.querySelector('#message-text').value = '')
      .catch(err => console.log(err.response.data));
  }
  
  const handleEnter = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      
      e.currentTarget.parentElement.requestSubmit();
    }
  }
  
  return (
    <form id='message-form' method="POST" action={`http://${props.SERVER}:9000/new_message`} onSubmit={handleSubmit}>
      <input id='message-user' type='text' name='user' placeholder='Username' pattern=".{3,}" title="3 characters minimum" required />
      <textarea id='message-text' name='text' placeholder='Message' onKeyDown={handleEnter} required />
      <button id='message-submit' type='submit'>Send</button>
    </form>
  );
}

export default ChatInput;