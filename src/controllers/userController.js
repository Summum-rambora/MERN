const User = require("../models/User");
const Task = require("../models/Task");


exports.getAllUsers = (req, res) => {
  res.json(User.getAll());
};

exports.getUserById = (req, res) => {
  const user = User.getById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: `Пользователь с ID ${req.params.id} не найден` });
  }
  res.json(user);
};

exports.createUser = (req, res) => {
  const { fullName, job, age, city } = req.body;

  if (!fullName || !job || !age || !city) {
    return res.status(400).json({ error: "Все поля (fullName, job, age, city) обязательны" });
  }

  const newUser = User.create({ fullName, job, age, city });
  res.status(201).json(newUser);
};


exports.updateUser = (req, res) => {
  const { fullName, job, age, city } = req.body;
  const updatedUser = User.update(parseInt(req.params.id), { fullName, job, age, city });

  if (!updatedUser) {
    return res.status(404).json({ error: `Пользователь с ID ${req.params.id} не найден` });
  }

  res.json(updatedUser);
};


exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userExists = User.getById(userId);

  if (!userExists) {
    return res.status(404).json({ error: `Пользователь с ID ${userId} не найден` });
  }

 
  Task.deleteAllByUserId(userId);

 
  User.delete(userId);

  res.json({ message: `Пользователь с ID ${userId} удален вместе с его задачами` });
};
