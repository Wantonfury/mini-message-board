import './App.css';
import { useEffect, useState } from "react";
import ChatBoard from './components/ChatBoard';
import ChatInput from './components/ChatInput';
import Header from './components/Header';

const SERVER = process.env.REACT_APP_SERVER || 'localhost:9000';

function heartbeat() {
  clearTimeout(this.pingTimeout);
  
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkMessages, setCheckMessages] = useState(true);
  
  useEffect(() => {
    const ws = new WebSocket(`wss://${SERVER.replace('https://', '')}`);
    
    ws.addEventListener('message', (e) => {
      if (e.data === 'new_message') {
        setCheckMessages(true);
      }
    });
    
    ws.addEventListener('error', console.error);
    ws.addEventListener('open', heartbeat);
    ws.addEventListener('ping', heartbeat);
    ws.addEventListener('close', function clear() {
      clearTimeout(this.pingTimeout);
    });
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const messages = await fetch(`${SERVER}/get_messages`)
        .then(res => res.text())
        .then(res => {
          setIsLoading(false);
          return JSON.parse(res);
        });
      
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
        <ChatInput SERVER={SERVER} />
      </div>
    </div>
  );
}

export default App;
