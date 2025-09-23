import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        color: "#555",
      }}
    >
      <img
        src="/assets/empty.png" // यहाँ अपनी icon या illustration का path डालें
        alt="No Data"
        style={{ width: "150px", marginBottom: "20px" }}
      />
      <p style={{ fontSize: "18px", fontWeight: "500" }}>
        {message || "कोई डेटा उपलब्ध नहीं है!"}
      </p>
    </div>
  );
};

export default EmptyState;