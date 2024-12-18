import { Fragment, useState } from "react";
import { UserInput } from "./Input";

export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [jwtAccessToken, setJwtAccessToken] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (enteredEmail !== "" && enteredPassword !== "") {
      async function makeLoginRequest() {
        const authData = {
          email: enteredEmail,
          password: enteredPassword,
        };

        try {
          const resp = await fetch("http://localhost:3030/login", {
            method: "POST",
            body: JSON.stringify(authData),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!resp.ok) {
            if (resp.status === 500) {
              // Internal server error.
              console.log("Server internal error");
              throw new Error(await resp.text());
            }
            throw new Error(resp.status);
          }

          const body = await resp.json();
          const accessToken = body.access_token;
          const refreshToken = body.refresh_token;

          console.log("Access token: ", accessToken);
          console.log("Refresh token: ", refreshToken);

          setJwtAccessToken(accessToken);

          // TODO: What do we do with refresh token?
          // That would be part of a cookie, so we don't have to worry about that.
        } catch (error) {
          console.error(error);
        }
      }

      makeLoginRequest();
    }
  }

  function handleEmailSubmit(event) {
    setEnteredEmail(event.target.value);
  }

  function handlePasswordSubmit(event) {
    setEnteredPassword(event.target.value);
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="control-row">
          <UserInput
            title="email"
            text="Email "
            onSubmitHandler={handleEmailSubmit}
            inputValue={enteredEmail}
          />
          <UserInput
            title="password"
            text="Password "
            onSubmitHandler={handlePasswordSubmit}
            inputValue={enteredPassword}
          />
        </div>
        <p className="form-actions">
          <button className="button">Login</button>
        </p>
      </form>
    </Fragment>
  );
}
