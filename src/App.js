import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await axios.get(
      "https://randomuser.me/api?results=5&gender=male"
    );
    const users = response.data.results;
    console.log(users);
    const names = [];
    const photos = [];
    users.forEach((user) => {
      const { title, first, last } = user.name;
      const { large } = user.picture;
      const fullName = `${title}. ${first} ${last}`;
      names.push({ name: fullName, photo: large });
    });
    setUsers(names);
  };

  return (
    <div className="App">
      {users.map((user) => (
        <>
          <h1>{user.name}</h1>
          <img src={user.photo} />
        </>
      ))}
      <br></br>
      <button onClick={fetchUsers}> Fetch Users </button>
    </div>
  );
}

const message=(text)=>{
}