import '../css/ChatBoard.css';
import { useCallback } from "react";

const ChatBoard = (props) => {
  var stringToColor = (string, saturation = 100, lightness = 75) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
  }
  
  const displayMessages = useCallback(() => {
    return props.messages.map((message, index) => {
      return <li key={index}>
        <span className="chat-date">{(message.date ? '(' + message.date + ') ' : '')}</span>
        <span className='chat-user' style={{ color: stringToColor(message.user) }}>{message.user + ': '}</span>
        <span className='chat-text'>{message.text}</span>
      </li>
    });
  }, [props.messages]);
  
  return (
    <ul className="chat-list">
      {displayMessages()}
    </ul>
  );
}

export default ChatBoard;