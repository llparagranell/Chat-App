import { useNavigate } from "react-router";
import "./home.css";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [value, setValue] = useState("");
  const [roomName, setRoom] = useState("");
  // const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handler = (e) => {
    e.preventDefault();
    // axios
    //   .get("http://localhost:5000/api/getmessagedata")
    //   .then((res) => setData(res.data))
    //   .catch((err) => console.log(err));

    // data.map(
    //   (e) =>
    //     e.roomName === roomName
    //       ? navigate(`/chat/${value}/${roomName}`)
    //       :
    axios
      .post("http://localhost:5000/api/createmessagedata", { roomName })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      navigate(`/chat/${value}/${roomName}`)
    // );
  };
  console.log();
  return (
    <div className="home-conatiner">
      <div className="home-form">
        <h2>Welcome 👋</h2>
        <p>Set a unique username to get started</p>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="text"
            name="roomName"
            placeholder="Enter room name"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handler}>Enter</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
