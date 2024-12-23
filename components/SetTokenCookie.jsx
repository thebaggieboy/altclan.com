import React, { useState } from 'react';

const SetTokenCookie = () => {
  const [jwtToken, setJwtToken] = useState('');

  const handleTokenChange = (event) => {
    setJwtToken(event.target.value);
  };

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;HttpOnly;`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie('jwtToken', jwtToken, 7); // Set the JWT token in the cookie for 7 days
  };

  return (
    <div>
      <h1>Set JWT Token Cookie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter JWT token"
          value={jwtToken}
          onChange={handleTokenChange}
        />
        <button type="submit">Set Cookie</button>
      </form>
    </div>
  );
};

export default SetTokenCookie;
