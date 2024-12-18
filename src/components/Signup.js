import { Fragment, useState } from "react";

async function signupRequest(firstName, lastName, email, password) {
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
        "X-Forwarded-For": "34.130.107.20", // Canada IP address (used for testing only, so that retrieve geolocation data will succeed).
      },
      credentials: "include",
    });

    if (!resp.ok) {
      if (resp.status === 500) {
        throw new Error(await resp.text());
      }

      throw new Error(resp.status);
    }

    // TODO: Redirect to /login page.
    // And once the user is logen in, we should validate its data
    // against the database. Important that the password should be salted.
  } catch (error) {
    // NOTE: This is not how errors should be handled,
    // Ideally we should set a state and display an error message
    // that a user with the specified email address already exists.
    // But I don't know how to propagate data between functions in react.
    console.error(error);
  }
}

function UserInput(title, text, onSubmitHandler, inputValue) {
  if (typeof onSubmitHandler !== "function") {
    throw new Error("invalid type for submit handler");
  }

  return (
    <div className="control no-margin">
      <label htmlFor={title}>{text}</label>
      <input
        id={title}
        type={title}
        name={title}
        onChange={onSubmitHandler}
        value={inputValue}
      ></input>
    </div>
  );
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
      signupRequest(
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredPassword
      );
    }

    // TODO: We should redirect to a /login page.
    // Let's omit sending the confirmation email.
    // That should be done somehow with a react router.

    clearSubmittedDataHandler();
  }

  // TODO: There is some repetition with an input,
  // it has to be moved out into a separte component.

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <h2>Signup</h2>
        <div className="control-row">
          {/* <div className="control no-margin">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleEmailSubmit}
              value={enteredEmail}
            ></input>
          </div> */}
          <UserInput
            title="email"
            text="Email "
            onSubmitHandler={handleEmailSubmit}
            inputValue={enteredEmail}
          />
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
