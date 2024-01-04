import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import io from "socket.io-client";
import "./chatpage.css";
import { MdDelete, MdLibraryAdd } from "react-icons/md";
import axios from "axios";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

function ChatPage() {
  const { value, roomName } = useParams();
  const navigate = useNavigate();

  const [players, setplayers] = useState(roomName);
  const [name, setName] = useState(value);
  const [message, setMessage] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    socket.emit("connectedUser", name);
    socket.emit("join_roomName", { name });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getmessagedata")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [message]);

  const handleSubmit = (event) => {
    if (name && message) {
      socket.emit("sendMessage", { name, message });
      axios
        .post(`http://localhost:5000/api/postmessagedata/${players}`, {
          name,
          message,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  const deletehandler = () => {
    axios
      .delete(`http://localhost:5000/api/deletemessagedata/${players}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(players);
  return (
    <div className="chatpage">
      <div className="chat-list display">
        <div className="username">
          {/* {value}  username form home */}
          <div>
            <h1>Chats</h1>
            <p onClick={()=> navigate('/')}>
              <MdLibraryAdd />
            </p>
          </div>
        </div>
        <div className="list">
          {data.map((roomName) => (
            <div className="list-container">
              {
                <h1 onClick={(e) => setplayers(e.target.innerText)}>
                  {roomName.roomName}
                </h1>
              }{" "}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-area">
        <div className="user-chat">
          <div
            onClick={(e) =>
              alert([
                ...new Set(
                  data
                    .find((room) => room.roomName === players)
                    .messages.map((ee) => ee.name)
                ),
              ])
            }
          >
            {players}
          </div>
          <p onClick={deletehandler}>
            <MdDelete />
          </p>
        </div>
        <div className="message-area">
          {data &&
            data
              .find((room) => room.roomName === players)
              ?.messages.map((e) => {
                return (
                  <div
                    key={e._id}
                    className={`${value === e.name ? "cl" : "messeges"}`}
                  >
                    <p className="messeges-name">{e.name}</p>
                    <p
                      className={`${
                        value === e.name
                          ? "messeges-message-cl"
                          : "messeges-message"
                      }`}
                    >
                      {e.message}
                    </p>
                  </div>
                );
              })}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your message"
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
