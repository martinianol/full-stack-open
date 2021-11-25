import React, { useState } from 'react'

const Header = () => <h1>give feedback</h1>;

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>);

const Statistics = ({ statistics }) => {
  if (statistics.total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={statistics.good} />
            <StatisticsLine text="neutral" value={statistics.neutral} />
            <StatisticsLine text="bad" value={statistics.bad} />
            <StatisticsLine text="total" value={statistics.total} />
            <StatisticsLine text="average" value={statistics.average} />
            <StatisticsLine text="positive" value={statistics.positive} />
          </tbody>
        </table>
      </>
    )
  }
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Buttons = ({ buttonsFunctions }) => {
  return (
    <div>
      <Button onClick={buttonsFunctions.increaseGood} text='good' />
      <Button onClick={buttonsFunctions.increaseNeutral} text='neutral' />
      <Button onClick={buttonsFunctions.increaseBad} text='bad' />
    </div>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const average = (good - bad) / (total);
  const positive = good / total * 100;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: average,
    positive: positive
  }

  const buttonsFunctions = {
    increaseGood: () => {
      setGood(good + 1);
      setTotal(total + 1);
    },
    increaseNeutral: () => {
      setNeutral(neutral + 1);
      setTotal(total + 1);
    },
    increaseBad: () => {
      setBad(bad + 1);
      setTotal(total + 1);
    }
  }

  return (
    <div>
      <Header />
      <Buttons buttonsFunctions={buttonsFunctions} />
      <Statistics statistics={statistics} />
    </div>
  );

}

export default App
