import '../css/ChatBoard.css';
import { useCallback, useState, useEffect } from "react";

const ChatBoard = (props) => {
  const [messagesCount, setMessagesCount] = useState(20);
  const [chatWindow, setChatWindow] = useState(null);
  
  if (!chatWindow && document.querySelector('.chat-list')) setChatWindow(document.querySelector('.chat-list'));
  
  useEffect(() => {
    setChatWindow(document.querySelector('.chat-list'));
  }, []);
  
  useEffect(() => {
    console.log(chatWindow.scrollY);
    if (!chatWindow.scrollY) setMessagesCount(count => count + 10);
  }, [chatWindow.scrollY]);
  
  var stringToColor = (string, saturation = 100, lightness = 75) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
  }
  
  const displayMessages = useCallback(() => {
    return props.messages.slice(0, messagesCount).map((message, index) => {
      return <li key={index}>
        <span className="chat-date">{(message.date ? '(' + message.date + ') ' : '')}</span>
        <span className='chat-user' style={{ color: stringToColor(message.user) }}>{message.user + ': '}</span>
        <span className='chat-text'>{message.text}</span>
      </li>
    });
  }, [props.messages, messagesCount]);
  
  return (
    <ul className="chat-list">
      {displayMessages()}
    </ul>
  );
}

export default ChatBoard;