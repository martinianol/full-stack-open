import React, { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0);

  /* setTimeout(
    () => setCounter(counter + 1),
    1000
  ); */

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  const Display = ({ counter }) => <div>{counter}</div>;

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>



  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text={'plus'} />
      <Button onClick={decreaseByOne} text={'minus'} />
      <Button onClick={setToZero} text={'zero'} />
    </div>
  )
}

export default App
