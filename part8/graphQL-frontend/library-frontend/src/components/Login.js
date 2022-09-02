import { useState } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const Login = ({ updateLoggedIn, updatePage, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation] = useMutation(LOGIN);

  if (!show) return null;

  const login = async (e) => {
    e.preventDefault();
    if (!username || !password) alert("Fill both fields.");
    else {
      const result = await loginMutation({ variables: { username, password } });
      if (result.hasOwnProperty("data")) {
        localStorage.setItem("token", result.data.login.value);
        updateLoggedIn(true);
        updatePage("books");
      }
    }
  };

  return (
    <form onSubmit={login}>
      <label>
        Enter username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Enter password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
