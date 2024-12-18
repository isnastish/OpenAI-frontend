import { Fragment, useState } from "react";

async function signupRequest({ firstName, lastName, email, password }) {
  const userData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  try {
    const resp = await fetch("http://localhost:3030/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "34.130.107.20", // Canada IP address.
      },
      credentials: "include",
    });


  } catch (error) {}
}

function Input() {
  return <Fragment></Fragment>;
}

export default function Signup() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");

  const handleEmailSubmit = (event) => setEnteredEmail(event.target.value);
  const handlePasswordSubmit = (event) =>
    setEnteredPassword(event.target.value);

  const firstNameSubmitHandler = (event) =>
    setEnteredFirstName(event.target.value);
  const lastNameSubmitHandler = (event) =>
    setEnteredLastName(event.target.value);

  const clearSubmittedDataHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredFirstName("");
    setEnteredLastName("");
  };

  function handleFormSubmit(event) {
    event.preventDefault();

    if (
      enteredEmail !== "" &&
      enteredPassword !== "" &&
      enteredFirstName !== "" &&
      enteredLastName !== ""
    ) {
      console.log(
        "submitted email: " +
          enteredEmail +
          "\npassword: " +
          enteredPassword +
          "\nfirstName: " +
          enteredFirstName +
          "\nlastName: " +
          enteredLastName
      );

      // TODO: Password and email address validation.
      // Although it could be done on the server side.

      signupRequest(
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredPassword
      );
    }

    // TODO: Here we have to redirect to /openai page.
    // So we can make requests to Openai model

    clearSubmittedDataHandler();
  }

  // TODO: There is some repetition with an input,
  // it has to be moved out into a separte component.

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
          <div className="control no-margin">
            <label htmlFor="password">FirstName </label>
            <input
              id="first-name"
              type="first-name"
              name="first-name"
              onChange={firstNameSubmitHandler}
              value={enteredFirstName}
            ></input>
          </div>
          <div className="control no-margin">
            <label htmlFor="password">LastName </label>
            <input
              id="last-name"
              type="last-name"
              name="last-name"
              onChange={lastNameSubmitHandler}
              value={enteredLastName}
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
