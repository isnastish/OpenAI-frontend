import { Fragment, useState } from "react";
import { validateEmailAddress } from "../utils/validation";
import Error from "./Error";

export default function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [invalidInputError, setInvalidInputError] = useState("");
  const [jwtAccessToken, setJwtAccessToken] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (enteredEmail !== "" && enteredPassword !== "") {
      if (!validateEmailAddress(enteredEmail)) {
        setInvalidInputError(`Invalid email address ${enteredEmail}`);
        return;
      }

      // if (!validatePassword(enteredPassword)) {
      //     setInvalidInputError(`Password validation failed ${enteredPassword}`)
      //     return;
      // }

      async function authorize() {
        const authData = {
          email: enteredEmail,
          password: enteredPassword,
        };

        // const baseURL = new URL("http://localhost:3031/api");

        try {
            // Make a request to login API endpoint
          const response = await fetch("http://localhost:3030/login", {
            method: "POST",
            body: JSON.stringify(authData),
            headers: {
              "Content-Type": "application/json",
            },
            // NOTE: Credentials are not supported if Access-Control-Allow-Origin is '*'
            credentials: "include",
          });

          if (response.status !== 200) {
            throw new Error(
              `Request failed with status: ${response.status}, error: ${response.text}`
            );
          }

          const respData = await response.json();
          const accessToken = respData.access_token;
          const refreshToken = respData.refresh_token;

          setJwtAccessToken(accessToken);

          console.log("Access token: ", accessToken);
          console.log("Refresh token: ", refreshToken);

          // TODO: redirect user to the starting page /
        } catch (error) {
          // TODO: Handle other errors
          // setInvalidInputError('Failed to make a request to openaAI backend server.');
        }
      }

      authorize();
    }
  }

  function handleEmailSubmit(event) {
    setEnteredEmail(event.target.value);
  }

  function handlePasswordSubmit(event) {
    setEnteredPassword(event.target.value);
  }

  function handleReset(event) {
    setEnteredEmail("");
    setEnteredPassword("");
  }

  function handleLogout(event) {
    async function logout() {
      const response = await fetch("http://localhost:3031/api/logout", {
        method: "GET",
        // NOTE: Credentials header has to be included or we won't get our header back
        credentials: "include",
      });
    }

    logout();

    setJwtAccessToken("");
  }

  // Invalid input component
  if (invalidInputError) {
    return (
      <Fragment>
        <Error
          title="An error occured"
          message={invalidInputError}
          onConfirm={() => {
            setInvalidInputError("");
          }}
        ></Error>
      </Fragment>
    );
  }

  // NOTE: For debugging only
  if (jwtAccessToken !== "") {
    console.log("JWT access token was set!");
  }

  return (
    <Fragment>
      {/* the browser refreshes the page when a form is submitted*/}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleEmailSubmit}
              value={enteredEmail}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handlePasswordSubmit}
              value={enteredPassword}
            />
          </div>
        </div>

        <p className="form-actions">
          <button className="button button-flat" onClick={handleReset}>
            Reset
          </button>
          <button className="button">Login</button>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </p>
      </form>
    </Fragment>
  );
}
