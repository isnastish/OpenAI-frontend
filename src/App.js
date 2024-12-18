import { Fragment, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

// async function fetchOpenAIData(message) {
//   try {
//     const jwtToken = "";
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("authorization", "Bearer " + jwtToken);

//     const response = await fetch("http://localhost:3030/openai", {
//       method: "PUT",
//       body: JSON.stringify({ "openai-question": message }),
//       headers: headers,
//       // NOTE: This is critical, because otherwise cookie won't be included
//       credentials: "include",
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch the data: ${response.status}, ${response.status}`
//       );
//     }

//     const respData = await response.json();
//     console.log(respData.openai);
//   } catch (error) {
//     // In case error.message is not present, we add our default message
//     setError({
//       message:
//         error.message || "Failed to make a request to openaAI backend server.",
//     });
//   }
// }

export default function App() {
  const [signupState, setSignupState] = useState(true);

  const signupStateUpdateHandler = () => {
    if (!signupState) {
      // Switch to login state.
      setSignupState(true);
      return;
    }
  }

  return (
    <Fragment>
      <div className="App">{signupState ? <Signup></Signup> : <Login />}</div>
    </Fragment>
  );
}
