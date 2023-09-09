import React from "react";
import { useState, useEffect } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import StartFirebase from "../Conponents/firebaseConfig.js";
import { Link } from "react-router-dom";
import { remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
const cardStyle = {
  width: "18rem",
  padding: "15px",
  marginTop: "20px",
};

function ListUsers() {
  let history = useNavigate();
  StartFirebase();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    //console.log(database);
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const users = [];
      for (let id in data) {
        users.push(data[id]);
      }
      setUsers(users);
    });
  }, []);
  console.log(users);

  const deleteUser = (userId) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    console.log(userRef);
    remove(userRef)
      .then(() => {
        console.log("Utilisateur supprimé avec succès");
        history("/listusers");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
      });
  };

  return (
    <div>
      <h1 class="mt-5">List Users</h1>
      <div class="container d-flex flex-wrap">
        {users.map((user) => (
          <>
            <div key={user.id} class="card mx-5" style={cardStyle}>
              <div class="card-body">
                <h5 class="card-title">{user.firstName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{user.lastName}</h6>
                <p class="card-text">{user.email}</p>
                <p class="card-text">{user.id}</p>
                <Link
                  class="btn btn-warning btn-sm card-link"
                  to={`/editusers/${users.id}`}
                >
                  edit user
                </Link>
                <Link
                  to=""
                  class="btn btn-danger btn-sm card-link"
                  onClick={() => deleteUser(user.id)}
                >
                  delete user
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ListUsers;
