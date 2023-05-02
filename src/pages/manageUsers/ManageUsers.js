import React, { useState, useEffect } from "react";
import Image from "../../core/data/588b0c601b6f7444c5fc9e347b252835.jpg";
import Table from "react-bootstrap/Table";
import "../../css/ManageUsers.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";
const ManageUsers = () => {
  const auth = getAuthUser();
  let token = null;
  if (auth) token = auth.token;
  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: "",
    reload: 0,
    success: null,
  });

  const deleteUser = (user_id) => {
    axios
      .delete("http://localhost:4000/admin/manage/delete/" + user_id, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setUsers({ ...users, reload: users.reload + 1,success:response.dats.message });
      })
      .catch((errors) => {

        setUsers({ ...users, reload: users.reload + 1,success:null,err:errors.response.data.message });
      });
  };

  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("http://localhost:4000/admin/manage/", {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        setUsers({ ...users, results: response.data, loading: false });
      })
      .catch((errors) => {
        console.log(errors);
        setUsers({
          ...users,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [users.reload]);
  return (
    <div className="manage-usersetUsers p-5 bg-white text-black">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center mb-3">Manage Users</h3>
        <div className="header d-flex justify-content-between">
          <Link to={"add-student"} className="btn btn-dark">
            Add New Student
          </Link>
          <Link to={"add-instructor"} className="btn btn-dark">
            Add New Instuctors
          </Link>
        </div>
      </div>

      {users.err && (
        <Alert variant="danger" className="p-2">
          {users.err}
        </Alert>
      )}
      {users.success && (
        <Alert variant="success" className="p-2">
          {users.success}
        </Alert>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {users.results.map((user) => (
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={"/manage-users/" + user.id}
                  className="btn btn-secondary mx-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ManageUsers;
