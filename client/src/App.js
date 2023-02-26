import './App.css';
import { useEffect, useState, useCallback } from "react";
import ChatBoard from './components/ChatBoard';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkMessages, setCheckMessages] = useState(true);
  
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.addEventListener('message', (e) => {
    if (e.data === 'new_message') {
      setCheckMessages(true);
    }
  });
  
  const fetchMessages = async () => {
    return fetch('http://localhost:9000/get_messages')
      .then(res => res.text())
      .then(res => {
        return JSON.parse(res);
      });
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const messages = await fetchMessages();
      
      setMessages(messages);
      setCheckMessages(false);
    }
    
    fetchData();
  }, [checkMessages]);
  
  return (
    <div className="App">
      <ChatBoard messages={messages} />
      <ChatInput />
    </div>
  );
}

export default App;
