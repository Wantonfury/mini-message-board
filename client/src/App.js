import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:9000/get_messages')
      .then(res => res.text())
      .then(res => setMessages(JSON.parse(res)));
  }, []);
  
  return (
    <div className="App">
      <ul>
        {messages.map((message, index) => {
          return <li key={index}>({message.date}) {message.user}: {message.text}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
