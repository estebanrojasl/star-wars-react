import React, { ChangeEvent } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import qs from "qs";

import users from "../users.json";

import DarthVader from "../assets/darth_vader.png";
import { useIsLoggedIn } from "../components/utils";

const Login = () => {
  const [signUpFlow, setSignUpFlow] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
  const [wrongPassword, setWrongPassword] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === username);

    const existingUserPasswordMatch = existingUser?.password === password;

    const newUserPasswordMatch = passwordConfirm === password;

    if (
      (existingUser == null && newUserPasswordMatch !== true) ||
      (existingUser != null && existingUser.password !== password)
    ) {
      setWrongPassword(true);
    } else if (existingUserPasswordMatch || newUserPasswordMatch) {
      localStorage.setItem("loggedIn", JSON.stringify(1));
      window.dispatchEvent(new Event("storage"));

      const { next } = qs.parse(location.search, { ignoreQueryPrefix: true });

      next != null
        ? navigate("/" + next, { replace: true })
        : navigate("/", { replace: true });
    }
  };

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const username = document.getElementById("username") as HTMLInputElement;
    setUsername(username.value);

    if (username.value === "") {
      setWrongPassword(false);
    }
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const password = document.getElementById("password") as HTMLInputElement;
    setPassword(password.value);

    if (password.value === "") {
      setWrongPassword(false);
    }
  };

  const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const passwordConfirm = document.getElementById(
      "password2"
    ) as HTMLInputElement;
    setPasswordConfirm(passwordConfirm.value);

    if (passwordConfirm.value === "") {
      setWrongPassword(false);
    }
  };

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn === true) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="max-w-2xl mx-auto" style={{ minHeight: 700 }}>
      <div className="flex justify-center items-start">
        <img
          src={DarthVader}
          alt="storm-trooper"
          className="px-8 pt-16"
          style={{ height: 500 }}
        />
        <div className="p-8">
          <h3 className="text-gray-500">You are not logged in!</h3>
          <div className="p-4" />
          <h2 className="text-gray-100">"I am altering the deal.</h2>
          <h2 className="text-gray-100">
            Login and I won't alter it any further"
          </h2>

          {/* give me your email and password to create a user*/}
          {/* I FIND YOUR LACK OF FAITH DISTURBING. */}
          <div className="p-6" />

          <form id="login-form" onSubmit={onSubmit} className="flex flex-col">
            <label htmlFor="username">Username:</label>

            <input
              type="text"
              className="bg-transparent border rounded border-gray-400 p-1"
              placeholder="E.g: user1@sw.com"
              id="username"
              defaultValue={username}
              onChange={(e) => onUserNameChange(e)}
            />
            <div className="p-2" />
            <label htmlFor="password">Password:</label>

            <input
              required
              type="password"
              className="bg-transparent border rounded border-gray-400 p-1"
              placeholder="Enter password..."
              id="password"
              defaultValue={password}
              onChange={(e) => onPasswordChange(e)}
            />
            {signUpFlow && (
              <>
                <div className="p-2" />
                <label htmlFor="password2">Confirm password:</label>
                <input
                  required
                  type="password"
                  className="bg-transparent border rounded border-gray-400 p-1"
                  placeholder="Enter password again..."
                  id="password2"
                  defaultValue={passwordConfirm}
                  onChange={(e) => onConfirmPasswordChange(e)}
                />
              </>
            )}

            {wrongPassword === true && (
              <>
                <small className="text-red-500">
                  Wrong password or username
                </small>
                <small className="text-gray-100">
                  <span className="text-red-500">Darth: </span>"He's as clumsy
                  as he's stupid."
                </small>
              </>
            )}

            <div className="p-2" />
            {signUpFlow === true ? (
              <input type="submit" value="Submit" />
            ) : (
              <div className="flex justify-end">
                <input type="submit" value="Login" />
                <div className="p-2" />
                <button
                  className="text-amber-300"
                  onClick={() => setSignUpFlow(true)}
                >
                  Sign up
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
