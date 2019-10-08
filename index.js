#!/usr/bin/env node

const qs = require('querystring');
const fetch = require('node-fetch');

const argv = require('yargs').command(
  'convert',
  'convert one currency to another',
  () => {},
  convert
).argv;

// TODO: add colors

function convert(yargs) {
  const [command, currency, value] = yargs._;
  const curencies = currency.split('-');

  const from = curencies[0].toUpperCase();
  const to = curencies[1].toUpperCase();

  const url = 'https://api.exchangeratesapi.io/latest';

  const params = qs.stringify({ base: from, symbols: to });

  fetch(`${url}?${params}`)
    .then(res => res.json())
    .then(res => {
      const rate = res.rates[to];
      const result = (value * rate).toFixed(2);

      console.log(`${value} ${from} is ${result} ${to}`);
    });
}
