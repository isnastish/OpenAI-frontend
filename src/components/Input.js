import { Fragment } from "react";

export function UserInput({ title, text, onSubmitHandler, inputValue }) {
  if (typeof onSubmitHandler !== "function") {
    throw new Error("invalid type for submit handler");
  }

  return (
    <Fragment>
      <div className="control no-margin">
        <label htmlFor={title}>{text}</label>
        <input
          id={title}
          type={title}
          name={title}
          onChange={onSubmitHandler}
          value={inputValue}
        ></input>
      </div>
    </Fragment>
  );
}
