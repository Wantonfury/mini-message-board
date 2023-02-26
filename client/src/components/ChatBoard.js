import '../css/ChatBoard.css';
import { useCallback } from "react";

const ChatBoard = (props) => {
  const displayMessages = useCallback(() => {
    return props.messages.map((message, index) => {
      return <li key={index}><span>{(message.date ? '(' + message.date + ') ' : '') + message.user + ': ' + message.text}</span></li>
    });
  }, [props.messages]);
  
  return (
    <ul className="chat-list">
      {displayMessages()}
    </ul>
  );
}

export default ChatBoard;