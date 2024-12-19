import { Fragment, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Openai from "./components/Openai";

export default function App() {
  const [signupState, setSignupState] = useState(true);
  const [openaiState, setOpenaiState] = useState(false);

  const signupStateUpdateHandler = () => setSignupState(false);
  const openaiUpdateHandler = () => setOpenaiState(true);

  // NOTE: Once we logged in successfully, the user should be redirected
  // to openai page (not really for now) where he can ask questions to chat gpt model,
  // and receive questions (not via the console).

  return (
    <Fragment>
      <div className="App">
        {signupState ? (
          <Signup signupStateUpdateHandler={signupStateUpdateHandler}></Signup>
        ) : (
          <>
            {openaiState ? (
              <Openai />
            ) : (
              <Login openaiUpdateHandler={openaiUpdateHandler} />
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
