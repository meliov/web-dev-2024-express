import e, { Router } from 'express';
import { setDefaultAutoSelectFamily } from 'net';
import { unis } from '../university/university.route';

const userRouter = Router();

let users = [
  { id: 4, name: 'John Doe', email: 'john@example.com', university: {id: 1, name: 'TU-Sofia', location: 'Sofia',}, subjects: ['maths'] },
  { id: 5, name: 'Jane Smith', email: 'jane@example.com', university: {id: 1, name: 'TU-Sofia', location: 'Sofia'}, subjects: ['maths'] },
];

userRouter.get('/', (req, res) => {
  res.json(users);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    university: req.body.university,
    subjects: req.body.subjects
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      name: req.body.name,
      email: req.body.email,
      university: req.body.university,
      subjects: req.body.subjects
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



userRouter.patch('/:id/update-university', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { universityId } = req.body;
  
  const user = users.find((u) => u.id === userId);
  if (!user) {
     res.status(404).json({ message: 'User not found' });
  }

  const university = unis.find((u) => u.id === universityId);
  if (!university) {
    res.status(400).json({ message: 'University not found' });
  }else{
    user!!.university.id = university.id;
    user!!.university.name = university.name;
    user!!.university.location = university.name;
  }

  res.json(user);
});


userRouter.patch('/:id/subjects', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { subjects } = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
     res.status(404).json({ message: 'User not found' });
  }

  if (!subjects) {
    res.status(400).json({ message: 'Invalid Subjects!' });
  }else{
    user!!.subjects = [subjects];
  }

  res.json(user);
});


export default userRouter;
