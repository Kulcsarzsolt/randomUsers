import axios from "axios";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (gender) => {
    const response = await axios.get(
      `https://randomuser.me/api?results=5&gender=${gender}`
    );

    const fetchedUsers = response.data.results;

    const currentUsers = [];
    fetchedUsers.forEach((user) => {
      const { title, first, last } = user.name;
      const { large } = user.picture;
      const fullName = `${title}. ${first} ${last}`;
      currentUsers.push({ name: fullName, photo: large });
    });

    setUsers(currentUsers);
  };

  return (
    <div className="App">
      <button onClick={() => fetchUsers("male")}>Male</button>
      <button onClick={() => fetchUsers("female")}>Female</button>
      <button onClick={() => fetchUsers("")}>All</button>
      <Message text="users is empty" display={users.length === 0} />
      <div>
        {users.map((user) => (
          <UserProfile name={user.name} photo={user.photo} />
        ))}
      </div>
    </div>
  );
}

const UserProfile = (props) => {
  const { name, photo } = props;

  return (
    <>
      <h1>{name}</h1>
      <img src={photo} alt={name} />
    </>
  );
};

const Message = ({ text, display }) => {
  if (!display) return <></>;

  return <h1>{text}</h1>;
};
