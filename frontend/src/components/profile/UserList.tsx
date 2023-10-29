/**
 * @file UserList.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief Handles listing all users
 * @version 0.1
 * @date 2022-12-14
 */

import React, { useState, useEffect } from "react";
import UserPreview from "./UserPreview";
import { Grid } from "@material-ui/core";
import Globals from "../Globals";
import "../../index";

function UserList() {
  var [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(Globals.BACKEND_URL + "users/");
    const data = await response.json();
    console.log("UserList - fetchUsers");
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div style={{marginLeft: "6vw"}}>
        <h1>Users</h1>
        <br />
        <Grid container spacing={1}>
          {users &&
            users.map((user: any) => (
              <Grid item xl={3}>
                <UserPreview userData={user} showLink={true} />
              </Grid>
            ))}
        </Grid>

      </div>
    </>
  );
}

export default UserList;
