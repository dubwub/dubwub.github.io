import React from 'react';
import './App.css';
import { Badge, Box, Button, Card, Center, Table, rem } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import '@mantine/core/styles.css';
import { IconCheck, IconX } from '@tabler/icons-react';

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
    setAttemptData([{guess: inputVal, actual: potatoCount, time: new Date().getTime() / 1000 - startTime}, ...attemptData])
    setInputVal('');
    resetPotatoes();
  }

  if (potatoes.length === 0) {
    resetPotatoes();
  }

  return (
    <Center> 
      <div>
          <div>
              {/* <Button variant="filled" color="gray" fullWidth onClick={() => {
                resetPotatoes();
              }}>Start new game</Button><br/> */}
              <Center><img src={'/potato_think.gif'} alt="logo" /><br/></Center>
              <Center><b>How many potatoes do I have???</b></Center>
              {
                potatoes
              }
              
              <Center>
                <input onKeyDown={getHotkeyHandler([
                    ['Enter', submit],
                  ])}
                  value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
                <button onClick={() => submit()}>Guess</button>
              </Center>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Guess</Table.Th>
                    <Table.Th>Actual</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Correct</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {
                    attemptData.map((attempt: any, index: number) => {
                      return <Table.Tr>
                        <Table.Td>{attempt.guess}</Table.Td>
                        <Table.Td>{attempt.actual}</Table.Td>
                        <Table.Td>{Math.round(attempt.time * 1000) / 1000} seconds</Table.Td>
                        <Table.Td>{attempt.guess == attempt.actual ? 
                            <Badge color="lime" leftSection={<IconCheck style={{ width: rem(12), height: rem(12) }} />}></Badge> :
                            <Badge color="red" leftSection={<IconX style={{ width: rem(12), height: rem(12) }}/>}></Badge>}</Table.Td>
                      </Table.Tr>
                    })
                  }  
                </Table.Tbody>
              </Table>
              </Card>
              {/* <div style={{backgroundColor: "blue", width: 20, height: 20, padding: 5}}></div> */}
          </div>
      </div>
    </Center>
  );
}

export default App;
