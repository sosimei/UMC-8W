// https://bcrypt-generator.com/
// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
// Smu123!!: $2a$12$ndKutlx7uVUq4bNYTbQvNevyoZDTH5bVIy.jFlpB7sqewn3wQudzG
let users = [
  {
    id: '1',
    name: '김용민',
    email: 'dydals3440@gmail.com',
    age: '24',
    username: 'dydals3440',
    password: '$2a$12$ndKutlx7uVUq4bNYTbQvNevyoZDTH5bVIy.jFlpB7sqewn3wQudzG',
  },
  {
    id: '2',
    name: 'Elon Musk',
    email: 'elone@gmail.com',
    age: '45',
    username: 'elonmusk1004',
    password: '$2a$12$ndKutlx7uVUq4bNYTbQvNevyoZDTH5bVIy.jFlpB7sqewn3wQudzG',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
