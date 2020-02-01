const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./baseRoute');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', routes);

module.exports = server;
