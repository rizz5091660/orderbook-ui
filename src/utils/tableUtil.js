import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newTrading= (CURRECY) => {
  const statusChance = Math.random();
  return {
    symbol: CURRECY,
    lastPrice: Math.floor(Math.random() * 30) + " " + CURRECY,
    change: Math.floor(Math.random() * 30),
    high: Math.floor(Math.random() * 100),
    low: Math.floor(Math.random() * 100),
    volume: Math.floor(Math.random() * 100) + " " + CURRECY
  };
};

export function makeData(CURRECY, len = 5553) {
  return range(len).map(d => {
    return {
      ...newTrading(CURRECY),
      children: range(10).map(newTrading)
    };
  });
}

export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;
