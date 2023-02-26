import '../css/ChatInput.css';
import axios from "axios";

const ChatInput = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:9000/new_message', document.querySelector('#message-form'), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => document.querySelector('#message-text').value = '')
      .catch(err => console.log(err.response.data));
  }
  
  return (
    <form id='message-form' method="POST" action="http://localhost:9000/new_message" onSubmit={handleSubmit}>
      <input id='message-user' type='text' name='user' placeholder='Username' pattern=".{3,}" title="3 characters minimum" required />
      <input id='message-text' type='text' name='text' placeholder='Message' required />
      <button type='submit'>Send</button>
    </form>
  );
}

export default ChatInput;