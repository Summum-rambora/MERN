const users = require("../../data/usersData"); 

class User {
  static getAll() {
    return users;
  }

  static getById(id) {
    return users.find((user) => user.id === id);
  }

  static create(userData) {
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      ...userData,
    };
    users.push(newUser);
    return newUser;
  }

  static update(id, updateData) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updateData };
    return users[index];
  }

  static delete(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
}

module.exports = User;
