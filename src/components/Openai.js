import { Fragment, useState } from "react";
import { UserInput } from "./Input";

async function makeOpenAIRequest(message, jwtAccessToken) {
  // NOTE: Since this is a protected route on the back-end side,
  // we have to include the authorization header with a JWT token.
  // Not refresh token, I suppose.
  console.log("Bearer " + jwtAccessToken);

  try {
    const resp = await fetch("http://localhost:3030/protected/openai", {
      method: "POST",
      body: JSON.stringify({ "openai-question": message }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwtAccessToken,
      },
      credentials: "include",
    });

    if (!resp.ok) {
      if (resp.status === 500 || resp.status === 401) {
        throw new Error(await resp.text());
      }
      throw new Error(resp.status);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    makeOpenAIRequest(openaiMessage, jwtAccessToken);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="control-row"></div>
        <UserInput
          title="openai"
          text="Openai question "
          onSubmitHandler={openaiMessageUpdateHandler}
          inputValue={openaiMessage}
        />
        <p className="form-actions">
          <button className="button">Send</button>
        </p>
      </form>
    </Fragment>
  );
}
