import React, { useState } from "react";
import axios from "axios";

const Api = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://lichess.org/api/user/${username}/current-game`
      );
      setUserData(response.data);
      console.log(response.data);
      setError(null);
    } catch (error) {
      setError("User not found or API failure.");
      setUserData(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#f7fafc",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.375rem",
          padding: "2rem",
          boxShadow:
            "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Lichess User Profile Viewer
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "1rem", display: "flex" }}
        >
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#4299e1",
              color: "#ffffff",
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              marginLeft: "0.5rem",
              boxSizing: "border-box",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4a90e2")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4299e1")
            }
          >
            Search
          </button>
        </form>
        {error && <p style={{ color: "#f56565" }}>{error}</p>}
        {userData && (
          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              User Information
            </h2>
            <p>Username: {username}</p>
            <p>Moves: {userData.moves.length}</p>
            <p>Status: {userData.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Api;
