import './App.css';
import { useEffect, useState } from "react";
import ChatBoard from './components/ChatBoard';
import ChatInput from './components/ChatInput';
import Header from './components/Header';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkMessages, setCheckMessages] = useState(true);
  
  const SERVER = process.env.SERVER || 'localhost';
  console.log("SERVER: " + SERVER);
  const ws = new WebSocket(`ws://${SERVER}:8080`);
  
  ws.addEventListener('message', (e) => {
    if (e.data === 'new_message') {
      setCheckMessages(true);
    }
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const messages = await fetch(`${SERVER}:9000/get_messages`)
        .then(res => res.text())
        .then(res => {
          setIsLoading(false);
          return JSON.parse(res);
        });
      
      setMessages(messages);
      setCheckMessages(false);
    }
    
    fetchData();
  }, [checkMessages, SERVER]);
  
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
