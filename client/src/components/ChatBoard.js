import '../css/ChatBoard.css';
import { useCallback } from "react";

const ChatBoard = (props) => {
  const displayMessages = useCallback(() => {
    return props.messages.map((message, index) => {
      return <li key={index}>({message.date}) {message.user}: {message.text}</li>
    });
  }, [props.messages]);
  
  return (
    <ul>
      {displayMessages()}
    </ul>
  );
}

export default ChatBoard;