import React, { useState } from 'react'

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>);

const InfoAnecdote = ({ vote }) => (<p>Has {vote} votes</p>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  //Established the votes at the beginning
  let pointsStart = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(pointsStart);

  const randomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  }

  const vote = () => {
    const copyPoints = { ...points }
    // increment the property value by one
    copyPoints[selected] += 1
    setPoints(copyPoints);
  }



  return (
    <div>
      {anecdotes[selected]}
      <InfoAnecdote vote={points[selected]} />
      <div>
        <Button onClick={vote} text={"Vote"} />
        <Button onClick={randomAnecdote} text={"Next Anecdote"} />
      </div>
    </div>
  )
}

export default App
