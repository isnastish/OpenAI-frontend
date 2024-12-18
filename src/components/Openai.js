import { Fragment } from "react";

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

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default function Openai({ jwtAccessToken }) {
  return (
    <Fragment>
      <div className="control-row"></div>
      <div className="control no-margin">
        <label htmlFor="openai">Openai question: </label>
        <input
          id="openi"
          type="openai"
          name="openai"
          onChange={handleEmailSubmit}
          value={enteredEmail}
        />
      </div>
      <p className="form-actions">
        <button className="button">Send</button>
      </p>
    </Fragment>
  );
}

// NOTE: Once we're logged in, we should redirect user
// to /openai route where he can submit questions to openai
// The opeani endpoint should be protected on the server side,
// and we should validate the token before making an actual
// request to OpenAI API server.
