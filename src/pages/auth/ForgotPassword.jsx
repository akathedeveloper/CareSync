// ForgotPassword.js
import React, { useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton"; // <-- skeleton import

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // yaha API call likhni hogi backend ke liye
    setTimeout(() => {
      if (email) {
        setMessage("Password reset link sent to " + email);
      } else {
        setMessage("Please enter a valid email address.");
      }
      setLoading(false); // stop loading
    }, 2000); // demo delay
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <label>Email Address:</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-4">
          <LoadingSkeleton width="100%" height="20px" count={2} />
        </div>
      )}

      {/* Message */}
      {!loading && message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;