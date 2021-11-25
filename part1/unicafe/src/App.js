import React, { useState } from 'react'

const Header = () => <h1>give feedback</h1>;

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>);

const Statistics = ({ statistics }) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {statistics.good}</p>
      <p>neutral {statistics.neutral}</p>
      <p>bad {statistics.bad}</p>
      <p>total {statistics.total}</p>

    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);




  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
  }

  const increaseGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  const average = (good - bad) / (total);
  const positive = good / total * 100;



  return (
    <div>
      <Header />
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />
      <Statistics statistics={statistics} />
      <p>average {isNaN(average) ? '-' : average}</p>
      <p>positive {isNaN(positive) ? '-' : `${positive} %`} </p>
    </div>
  )


}

export default App
