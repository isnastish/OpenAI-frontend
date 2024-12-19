import { Fragment, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

export default function App() {
  const renderStates = ["signup", "login", "openai"];

  const [signupState, setSignupState] = useState(true);

  const signupStateUpdateHandler = () => {
    console.log(
      "signupStateUpdateHandler() was invoked, signupState: " + signupState
    );
    if (signupState) {
      // Switch to login state.
      setSignupState(false);
      return;
    }
  };

  console.log("APP COMPONENT RENDERING");

  // NOTE: Once we logged in successfully, the user should be redirected
  // to openai page (not really for now) where he can ask questions to chat gpt model,
  // and receive questions (not via the console).

  return (
    <Fragment>
      <div className="App">
        {signupState ? (
          <Signup signupStateUpdateHandler={signupStateUpdateHandler}></Signup>
        ) : (
          <Login />
        )}
      </div>
    </Fragment>
  );
}
