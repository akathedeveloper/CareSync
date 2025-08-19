import React from "react";

const Profile = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Profile</h2>
    <div className="bg-white p-4 rounded shadow">
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  </div>
);

export default Profile;
