// Login.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

function Login() {
  const { setUserRole } = useContext(AuthContext);
  console.log("setUserRole function:", setUserRole); // Log the setUserRole function

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8082", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(credentials).toString(),
        credentials: "include",
      });

      if (response.ok) {
        const roleResponse = await fetch("http://localhost:8082/role", {
          method: "GET",
          credentials: "include",
        });
        const fetchedRole = (await roleResponse.text()).trim();
        console.log("Fetched role from server:", fetchedRole); // Log the role fetched from the server
        setUserRole(fetchedRole); // Set the user role in context
        console.log("Role set in AuthContext:", fetchedRole); // Log the role after setting it

        // Redirect based on role
        if (fetchedRole === "ROLE_ADMIN") {
          window.location.href = "/admin";
        } else if (fetchedRole === "ROLE_STUDENT") {
          window.location.href = "/stud";
        } else if (fetchedRole === "ROLE_DH") {
          window.location.href = "/dh";
        } else if (fetchedRole === "ROLE_AD") {
          window.location.href = "/ad";
        } else if (fetchedRole === "ROLE_REG") {
          window.location.href = "/reg";
        } else if (fetchedRole === "ROLE_TEACHER") {
          window.location.href = "/teach";
        } else {
          alert("Unknown role");
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("An error occurred during login.");
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <div className="modal" id="login">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-secondary fs-5 text-center">
              Login to ASEMS <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary text-white">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;