import { Fragment, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Openai from "./components/Openai";

export default function App() {
  const [signupState, setSignupState] = useState(true);
  const [openaiState, setOpenaiState] = useState(false);

  // The reason why we would have to keep JWT token here,
  // is because we won't be able to propagate it from Login to Openai component.
  const [jwtToken, setJwtToken] = useState("");

  const signupStateUpdateHandler = () => setSignupState(false);
  const openaiUpdateHandler = () => setOpenaiState(true);

  const onJwtTokenHandler = (token) => {
    if (token === "") {
      throw new Error("empty JWT token");
    }
    console.log("Setting JWT token: " + token);
    setJwtToken(token);
  };

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
              <Openai jwtAccessToken={jwtToken}/>
            ) : (
              <Login
                openaiUpdateHandler={openaiUpdateHandler}
                jwtTokenHandler={onJwtTokenHandler}
              />
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}
