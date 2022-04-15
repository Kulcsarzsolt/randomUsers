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

      currentUsers.push({ name: fullName, photo: large, gender: user.gender });
    });

    setUsers(currentUsers);
  };

  return (
    <div className="App">
      <div style={{ borderBottom: "2px solid blue" }}>
        <FilterButtonTwo onClick={fetchUsers}>Male</FilterButtonTwo>
        <FilterButtonTwo onClick={fetchUsers}>Female</FilterButtonTwo>
        <FilterButtonTwo onClick={fetchUsers}>All</FilterButtonTwo>

        {/* <FilterButton fetchUsers={fetchUsers} gender="Male" />
        <FilterButton fetchUsers={fetchUsers} gender="Female" />
        <FilterButton fetchUsers={fetchUsers} /> */}
      </div>

      <Message text="users is empty" display={users.length === 0} />
      <div>
        {users.map((user) => (
          <UserProfile
            name={user.name}
            photo={user.photo}
            gender={user.gender}
          />
        ))}
      </div>
    </div>
  );
}

const UserProfile = (props) => {
  const { name, photo, gender } = props;

  const textColor = gender === "male" ? "blue" : "red";

  return (
    <>
      <h1 style={{ color: textColor }}>{name}</h1>
      <img src={photo} alt={name} />
    </>
  );
};

const Message = ({ text, display }) => {
  if (!display) return <></>;

  return <h1>{text}</h1>;
};

const FilterButton = ({ fetchUsers, gender = "" }) => {
  let buttonText = gender === "" ? "All" : gender;
  return (
    <>
      <button
        className="filterButton"
        onClick={() => fetchUsers(gender.toLowerCase())}
      >
        {buttonText}
      </button>
    </>
  );
};

const FilterButtonTwo = ({ onClick, children }) => {
  return (
    <>
      <button
        className="filterButton"
        onClick={() => onClick(children.toLowerCase())}
      >
        {children}
      </button>
    </>
  );
};
