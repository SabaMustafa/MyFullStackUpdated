import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/users/", { name })
      .then((res) => setUsers([...users, res.data]))
      .catch((err) => console.error(err));
    setName("");
  };

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {users.map(user => (<li key={user.id}>{user.name}</li>))}
      </ul>
    </div>
  );
}

export default App;
