'use strict'

const SquareConnect = require('square-connect');
const express = require('express');
const router = express.Router();
const app = express();

const defaultClient = SquareConnect.ApiClient.instance
const oauth2 = defaultClient.authentications['oauth2'];
const api = new SquareConnect.LocationsApi();

console.log('SquareConnect & DefaultClient', SquareConnect, defaultClient);
