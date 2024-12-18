import { Fragment } from "react";

export default function Openai() {
  // Here we don't have a JWT token
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
    </Fragment>
  );
}

// NOTE: Once we're logged in, we should redirect user
// to /openai route where he can submit questions to openai
// The opeani endpoint should be protected on the server side,
// and we should validate the token before making an actual
// request to OpenAI API server.
