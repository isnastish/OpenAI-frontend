import { Fragment, useState } from "react";

export default function Signup() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleEmailSubmit = (event) => setEnteredEmail(event.target.value);
  const handlePasswordSubmit = (event) =>
    setEnteredPassword(event.target.value);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (enteredEmail !== "" && enteredPassword !== "") {
      console.log(
        "submitted email: " + enteredEmail + "password: " + enteredPassword
      );
    }

    // TODO: Here we have to redirect to /openai page.
    // So we can make requests to Openai model

    // reset data
    setEnteredEmail("");
    setEnteredPassword("");
  }

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <h2>Signup</h2>
        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleEmailSubmit}
              value={enteredEmail}
            ></input>
          </div>
          <div className="control no-margin">
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handlePasswordSubmit}
              value={enteredPassword}
            ></input>
          </div>
        </div>
        <p className="form-actions">
          <button className="button">SignUp</button>
        </p>
      </form>
    </Fragment>
  );
}
