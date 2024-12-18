import { Fragment, useState } from "react";
import { UserInput } from "./Input";

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

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit}>
        <h2>Signup</h2>
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
          <UserInput
            title="first-name"
            text="First Name "
            onSubmitHandler={firstNameSubmitHandler}
            inputValue={enteredFirstName}
          />
          <UserInput
            title="last-name"
            text="Last Name "
            onSubmitHandler={lastNameSubmitHandler}
            inputValue={enteredLastName}
          />
        </div>
        <p className="form-actions">
          <button className="button">SignUp</button>
        </p>
      </form>
    </Fragment>
  );
}
