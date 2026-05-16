import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../auth";
import { getAccessToken, setTokens } from "../tokens";
import Chatbot from "../component/Chatbot";

const Login = () => {
  const navigate = useNavigate();

  const token = getAccessToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      setTokens(data.access, data.refresh);

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    <Chatbot />
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    </>
  );
};

export default Login;

