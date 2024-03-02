import React, { useState, useEffect } from "react";

const Task2 = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://lichess.org/api/user/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUserData(data);
        setError(null);
      } catch (error) {
        console.error("Error searching user:", error);
        setUserData(null);
        setError("User not found");
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const renderUserInformation = () => {
    if (!userData) return null;

    // Filter out unwanted keys
    const filteredData = Object.entries(userData).filter(([key]) => {
      return key === "count" || key === "perfs" || key === "id";
    });

    return (
      <div style={{ marginTop: "2rem", backgroundColor: "#f8d7da", borderRadius: "0.5rem", display: "flex", flexDirection: "column" }}>
        {filteredData.map(([key, value]) => (
          <div key={key} style={{ padding: "0.5rem" }}>
            {key === "perfs"
              ? renderPreferences(value)
              : renderKeyValue(key, value)}
          </div>
        ))}
      </div>
    );
  };

  const renderPreferences = (prefs) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", padding: "1.25rem", maxWidth: "100%", overflow: "auto" }}>
        {Object.entries(prefs).map(([prefKey, prefValue]) => (
          <div key={prefKey} style={{ backgroundColor: "#fef3c7", margin: "0.5rem", borderRadius: "0.5rem" }}>
            {renderKeyValue(prefKey, prefValue)}
          </div>
        ))}
      </div>
    );
  };

  const renderKeyValue = (key, value) => {
    return (
      <div key={key} style={{ margin: "0.5rem" }}>
        {key} : {typeof value === "object" ? renderPreferences(value) : value}
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <div id="" style={{ display: "grid", justifyContent: "center", borderRadius: "1rem", width: "75%", paddingTop: "2rem", paddingBottom: "2rem", margin: "0 auto" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", backgroundColor: "#d1e7dd", borderRadius: "1rem", width: "75%", paddingBottom: "2rem" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2.25rem", margin: "1rem", paddingTop: "2rem" }}> Task 2</h1>
          <h1 style={{ fontWeight: "500", fontSize: "1.875rem", margin: "1rem" }}>Create a User Search Function</h1>
          <h2 style={{ fontWeight: "500", fontSize: "1.25rem", marginBottom: "1rem" }}>Search the username of Lichess player inside searchbox</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <input
              placeholder="Enter Username Here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", margin: "1rem", padding: "1rem", backgroundColor: "#e9d8fd", textAlign: "center", borderRadius: "1rem" }}>User Information</h1>
        <div style={{ fontWeight: "500", margin: "1rem", backgroundColor: "#add8e6", borderRadius: "1rem", padding: "1rem" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "500", textAlign: "center" }}>Displaying Search result</div>
          {error ? <p style={{ color: 'red', textAlign: 'center' }}>{error}</p> : renderUserInformation()}
        </div>
      </div>
    </div>
  );
};

export default Task2;
