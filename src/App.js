import { Fragment, useEffect, useReducer, useState } from "react";
import Error from "./components/Error";
import Login from "./components/Login";
import Signup from "./components/Signup";

function CustomCounter() {
  const [count, setCount] = useState(0);

  // force this component to re-render
  const [bool, setBool] = useState(false);

  // error state
  const [error, setError] = useState();

  useEffect(() => {
    // TODO: This could be moved into a separate function.
    async function fetchOpenAIData(message) {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("http://localhost:3030/openai", {
          method: "PUT",
          body: JSON.stringify({ "openai-question": message }),
          headers: headers,
          // NOTE: This is critical, because otherwise cookie won't be included
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch the data: ${response.status}, ${response.status}`
          );
        }

        const respData = await response.json();
        console.log(respData.openai);
      } catch (error) {
        // In case error.message is not present, we add our default message
        setError({
          message:
            error.message ||
            "Failed to make a request to openaAI backend server.",
        });
      }
    }

    fetchOpenAIData("Hi! How are you doing today?");
  }, [count]);

  if (error) {
    return (
      <Error
        title="an error occured"
        message={error.message}
        onConfirm={() => {
          // Remove error icon
          setError();
        }}
      />
    );
  }

  return (
    <Fragment>
      <div className="counter">
        <button
          onClick={() => {
            setBool(!bool);
          }}
        >
          Re-render
        </button>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>
        <p>Count: {count}</p>
      </div>
    </Fragment>
  );
}

export default function App() {
  return (
    <Fragment>
      <div className="App">
        <Signup></Signup>
        {/* <Login></Login> */}
      </div>
    </Fragment>
  );
}
