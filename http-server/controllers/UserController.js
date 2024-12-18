let users = require('../mocks/users')

module.exports = {
  listUsers: (request, response) => {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1
    })

    response.send(200, sortedUsers);
  },
  getUserById: (request, response) => {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, 'User not found!');
    }

    response.send(200, user);
  },
  createUser: (request, response) => {
    const { body } = request;

    const user = users.find((user) => user.name === body.name);

    if (user) {
      return response.send(400, 'This user name is already in use');
    }

    const lastUserId = users.length;

    const newUser = {
      id: lastUserId + 1,
      name: body.name
    }

    users.push(newUser)
    response.send(200, newUser);


  },
  updateUser: (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, { error: 'User not found' });
    }

    const updatedUser = {
      ...user,
      name: name,
    }

    users = users.map((_user) => _user.id === Number(id) ? updatedUser : _user)

    response.send(200, updatedUser);
  },
  deleteUser: (request, response) => {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, { error: 'User not found' });
    }

    users = users.filter((_user) => _user.id !== Number(id))

    response.send(200, user);
  }
}