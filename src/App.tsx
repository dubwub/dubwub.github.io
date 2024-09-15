import React from 'react';
import './App.css';
import { Card, Center } from '@mantine/core';


function App() {
  const [potatoes, setPotatoes] = React.useState<any>([]);
  const [potatoCount, setPotatoCount] = React.useState(0);
  const [inputVal, setInputVal] = React.useState(''); // guesser logic
  const [attemptData, setAttemptData] = React.useState<any>([]); // historical data
  const [startTime, setStartTime] = React.useState(0);
  
  // helper function
  function resetPotatoes() {
    // potato logic
    let numPotatoLines = Math.floor(Math.random() * 5 + 3)
    let potatoCount = 0

    let tmpPotatoes: any = [];
    for (let i = 0; i < numPotatoLines; i++) {
      let add = [];
      for (let j = 0; j < 10; j++) {
        if (Math.random() < 0.33) { // 33% chance of being a potato gap
          add.push(<div style={{display: 'inline-block', width: 45, height: 40}} />)
        } else {
          potatoCount++;
          add.push(
            <img src={'/potato' + (Math.floor(Math.random() * 3) + 1) + '.gif'} style={{display: 'inline-block', margin: 0, padding: 2.5}} />
          )
        }
      }
      add.push(<br/>)
      tmpPotatoes.push(add)
    }

    setPotatoes(tmpPotatoes);
    setPotatoCount(potatoCount);
    setStartTime(new Date().getTime() / 1000);
  }
  
  function submit() {
    setAttemptData([...attemptData, {guess: inputVal, total: potatoCount, time: new Date().getTime() / 1000 - startTime}])
    setInputVal('');
    resetPotatoes();
  }

  return (
    <Center style={{width: '100%'}}>
      <div className="App">
        <header className="App-header">
          
          <button onClick={() => {
            resetPotatoes();
          }}>Reset</button><br/>
          <img src={'/potato_think.gif'} alt="logo" /><br/>
          {
            potatoes
          }
          <input value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
          <button onClick={() => submit()}>Guess</button>
          {
            attemptData.map((attempt: any) => {
              <Card>
                <b>Guess:</b> {attempt.guess} <br/>
                <b>Actual:</b> {attempt.actual} <br/>
                <b>Time:</b> {attempt.time} <br/>
                <b>Passed:</b> {attempt.guess === attempt.actual ? "Yes" : "No"}
              </Card>
            })
          }
        </header>
      </div>
    </Center>
  );
}

export default App;
