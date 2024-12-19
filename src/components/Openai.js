import { Fragment, useState } from "react";
import { UserInput } from "./Input";

// NOTE: This function should probably return a response, 
// so we can process it later.
// But, 
async function makeOpenAIRequest(message, jwtAccessToken) {
  // NOTE: Since this is a protected route on the back-end side,
  // we have to include the authorization header with a JWT token.
  // Not refresh token, I suppose.
  try {
    const headers = new Headers()
      .append("Content-Type", "application/json")
      .append("authorization", "Bearer " + jwtAccessToken);

    const resp = await fetch("http://localhost:3030/openai", {
      method: "POST",
      body: JSON.stringify({ "openai-question": message }),
      headers: headers,
      credentials: "include",
    });

    if (!resp.ok) {
      if (resp.status === 500) {
        throw new Error(await resp.text());
      }

      throw new Error(
        `Failed to fetch the data: ${response.status}, ${response.status}`
      );
    }

    // return await response.json();
    console.log(await resp.json());
  } catch (error) {
    console.error(error);
  }
}

export default function Openai({ jwtAccessToken }) {
  const [openaiMessage, setOpenaiMessage] = useState("");

  const openaiMessageUpdateHandler = (event) => {
    setOpenaiMessage(event.target.value);
  };

  return (
    <Fragment>
      <div className="control-row"></div>
      <UserInput
        title="openai"
        text="Openai question "
        onSubmitHandler={openaiMessageUpdateHandler}
        inputValue={openaiMessage}
      />
      <p className="form-actions">
        <button className="button" onClick={makeOpenAIRequest}>
          Send
        </button>
      </p>
    </Fragment>
  );
}
