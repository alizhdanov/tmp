#!/usr/bin/env node
const argv = require('yargs').argv;
const fetch = require('node-fetch');

const [currency, value] = argv._;

const [from, to] = currency.split('-');

fetch(
  `https://api.exchangeratesapi.io/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`
)
  .then(res => res.json())
  .then(res => {
    const rate = res.rates[to.toUpperCase()];
    const result = (value * rate).toFixed(2);

    console.log(
      `${value} ${from.toUpperCase()} is ${result} ${to.toUpperCase()}`
    );
  });

// TODO: add colors
