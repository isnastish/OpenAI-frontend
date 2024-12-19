import { Fragment, useState } from "react";
import { UserInput } from "./Input";

export default function Login({ openaiUpdateHandler, jwtTokenHandler }) {
  // NOTE: When calling one of set state functions,
  // we're telling react that the outer component has to be rerendered.

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

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
              throw new Error(await resp.text());
            }
            throw new Error(resp.status);
          }

          const body = await resp.json();
          const accessToken = body.access_token;
          const refreshToken = body.refresh_token;

          // NOTE: Only for debugging.
          console.log("Access token: ", accessToken);
          console.log("Refresh token: ", refreshToken);

          jwtTokenHandler(accessToken);
          openaiUpdateHandler();

          // TODO: What do we do with refresh token?
          // That would be part of a cookie, so we don't have to worry about that.
        } catch (error) {
          console.error(error);
        }
      }

      makeLoginRequest();
    }
  }

  const emailSubmitHandler = (event) => setEnteredEmail(event.target.value);
  const passwordSubmitHandler = (event) =>
    setEnteredPassword(event.target.value);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="control-row">
          <UserInput
            title="email"
            text="Email "
            onSubmitHandler={emailSubmitHandler}
            inputValue={enteredEmail}
          />
          <UserInput
            title="password"
            text="Password "
            onSubmitHandler={passwordSubmitHandler}
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
