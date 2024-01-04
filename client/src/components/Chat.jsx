import "./chat.css";

function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-head">
        <h1>Head name</h1>
      </div>
      <div className="chat-message">
        <input type="text" placeholder="Enter your message..."/>
      </div>
    </div>
  );
}

export default Chat;
