const db = require('../database/dbConfig');

function getUsers() {
  return db('users');
}

function addUser(user) {
  return db('users').insert(user);
}

function findById(id) {
  return db('users').where({ id }).first();
}

module.exports = {
  getUsers,
  addUser,
  findById,
}