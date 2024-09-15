import React from 'react';
import './App.css';



function App() {
  // potato logic
  let numPotatoLines = Math.floor(Math.random() * 5 + 3)
  let potatoCount = 0

  let potatoes = [];
  for (let i = 0; i < numPotatoLines; i++) {
    let add = [];
    for (let j = 0; j < 10; j++) {
      if (Math.random() < 0.33) { // 33% chance of being a potato gap
        add.push(<div style={{display: 'inline-block', width: 40, height: 40}} />)
      } else {
        potatoCount++;
        add.push(
          <img src={'/potato' + (Math.floor(Math.random() * 3) + 1) + '.gif'} style={{display: 'inline-block', margin: 0, padding: 0}} />
        )
      }
    }
    add.push(<br/>)
    potatoes.push(add)
  }

  // guesser logic
  let inputVal = "";

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/potato_think.gif'} alt="logo" /><br/>
        {
          potatoes
        }
        <input onChange={(e) => inputVal = e.target.value}/>
        {inputVal}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
