import { Fragment, useEffect, useReducer, useState } from "react";
import SayHello from "./Components/Hello";
import Error from "./Components/Error";

function Hello({ name }) {
  return (
    <Fragment>
      <h2>Hello {name}</h2>
    </Fragment>
  )
}

function Comment({ username, time, children }) {
  return (
    <>
      <section>
        <p>{username} commented at {time}</p>
        {/* I'm assuming it's children components */}
        {children}
      </section>
    </>
  )
}

function onClickCallback() {
  console.log('button was clicked!');
};

function Button() {
  return (
    <Fragment>
      <button onClick={onClickCallback}>Press me!</button>
    </Fragment>
  )
}

function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  function handleButtonClick() {
    setCount(count + 1);
  }

  return (
    <Fragment>
      <button onClick={handleButtonClick}>Update count</button>
      <p>Counter value: {count}</p>
    </Fragment>
  )
}

function UpdateObject() {
  const [myObj, setMyObject] = useState({
    firstName: 'Alexey',
    lastName: 'Yevtushenko',
  })

  return (
    <Fragment>
    </Fragment>
  )
}

function reducer(state, action) {
  console.log('reducer was invoked.');

  // return a new state based on the old state that was passed as an argument
  switch (action.type) {
    case 'incr':
      console.log('incrementing the value');
      return { newCount: state.newCount + action.value };

    case 'decr':
      return { newCount: state.newCount - action.value };

    default:
      throw new Error(`Unknown type: ${action.type}`)
  }
}

function ButtonComponent({ buttonName = 'Default button', count, onClickCallback }) {
  return (
    <Fragment>
      <div>
        <button onClick={onClickCallback}>
          {buttonName}
        </button>
        <p>State count: {count}</p>
      </div>
    </Fragment>
  )
}

// Mount (initial render) -> updates (re-render) -> unmount 
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
        const response = await fetch('http://localhost:3031/api/openai/message', {
          method: 'PUT',
          body: JSON.stringify({ 'openai-question': message }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch the data: ${response.status}, ${response.status}`)
        }

        const respData = await response.json();
        console.log(respData.openai);

      } catch (error) {
        // In case error.message is not present, we add our default message
        setError(
          {message: error.message || 'Failed to make a request to openaAI backend server.'}
        );
      }
    }

    fetchOpenAIData('Hi! How are you doing today?');
  }, [count])

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
    )
  }

  return (
    <Fragment>
      <div className="counter">
        <button onClick={() => { setBool(!bool); }}>Re-render</button>
        <button onClick={() => { setCount(count + 1); }}>Increment</button>
        <p>Count: {count}</p>
      </div>
    </Fragment>
  )
}

export default function App() {
  const myVar = true;
  const name = 'Alexey';

  const props = {
    id: "input2",
    type: "text",
  };

  const [count, setCount] = useState(0);
  const [age, setAge] = useState(24);
  const [value, setValue] = useState(''); // set to empty value

  // using reducer
  const [state, dispatch] = useReducer(reducer, {
    newCount: 0,
  });

  const [isShown, setIsShown] = useState(true);

  return (
    <Fragment>
      <div className="App">
        <h2>OpenAI frontend</h2>

        <button onClick={() => {
          setIsShown(!isShown);
        }}>
          {isShown ? 'Hide counter' : 'Show counter'}
        </button>
        {isShown ? <CustomCounter /> : null}

        <ButtonComponent
          buttonName="Increment"
          count={state.newCount}
          onClickCallback={() =>
            dispatch({
              type: 'incr',
              value: 10,
            })
          } />
        <ButtonComponent
          buttonName="Decrement"
          count={state.newCount}
          onClickCallback={() =>
            dispatch({
              type: 'decr',
              value: 10,
            })
          } />

        <label htmlFor="main-input">Enter info: </label>
        <input
          id="main-input"
          type="text"
          value={value}
          onChange={(event) => {
            console.log('main input triggered');
            setValue(event.target.value);
          }} />
        <SayHello />
        {/* conditional rendering */}
        {myVar ? <h2>myVar is True</h2> : <h2>myVar is False</h2>}
        {name ? <h2>This is the {name}</h2> : null}
        <label htmlFor="input">Enter your message: </label>
        <input id="input" type="text"></input>
        {/* another label */}
        <div>
          <label htmlFor={props.id}>Enter one more message: </label>
          <input {...props} placeholder="message"></input>
        </div>
        <Comment username="Alexey" time={new Date().toString()}>
          <p>I disregard all the changes made to this repository</p>
        </Comment>
      </div>
      <Hello name="Alexey"></Hello>
      <Button></Button>
      <div>
        <button onClick={() => {
          if (count >= 5) {
            console.log('count was reset!');
            setCount(0);
          } else {
            setCount(count + 1);
          }
        }}>Increase count</button>
        <p>Count: {count}</p>
      </div>
      <div>
        <button onClick={() => {
          if (age === 30) {
            console.log('You turned 30! Congratulations?');
          }
          setAge(age + 1);
        }}>Update age</button>
        <p>Alexey's age: {age}</p>
      </div>
      <div>
        <label htmlFor="my-name">Enter new name: </label>
        <input id="my-name" type="text" onChange={() => {
          console.log("Input was entered");
        }}></input>
      </div>
      <Counter initialCount={0}></Counter>
      {/* Uses default value */}
      <Counter></Counter>
    </Fragment >
  );
}
