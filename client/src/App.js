import './App.css';
import { useEffect, useState, useCallback } from "react";
import ChatBoard from './components/ChatBoard';
import ChatInput from './components/ChatInput';
import Header from './components/Header';

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
        if (isLoading) setIsLoading(false);
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
  
  useEffect(() => {
    if (isLoading) setMessages([
      {
        text: 'Loading messages...',
        user: '',
        date: null
      }
    ]);
  }, [isLoading]);
  
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <ChatBoard messages={messages} />
        <ChatInput />
      </div>
    </div>
  );
}

export default App;