const db = require('../database/dbConfig');
const Users = require('../users/users-model');

beforeEach(async () => {
  await db('users').truncate()
})

describe('Users Model', () => {
  test('should return the correct number of users in the database', async () => {
    await Users.addUser({ username: "admin", password: "1234" });
    await Users.addUser({ username: "danny", password: "2345" });

    const allUsers = await db('users');

    expect(allUsers).toHaveLength(2);
  })

  test('should return a user object on fetch', async () => {
    await db('users').insert({ username: "danny", password: "2345" });

    const danny = await Users.findBy({ id: 1 });
    expect(danny).toMatchObject({ username: "danny", password: "2345" })
  })
  

})

// Return the right numbers of users