import React from "react";

export default function ErrorPage() {
  return (
    <div
      className="error-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //   flexGrow: 1,
        flexGrow: 1,
      }}
    >
      <div className="error-message" style={{ fontSize: 20, color: "black" }}>
        404 Error- Page Not Found
      </div>
    </div>
  );
}
