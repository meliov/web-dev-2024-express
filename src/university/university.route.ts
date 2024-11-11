import { Router } from 'express';

const uniRouter = Router();

export let unis = [
    { id: 1, name: 'TU-Sofia', location: 'Sofia' },
    { id: 2, name: 'Harvard University', location: 'Cambridge, USA' },
    { id: 3, name: 'MIT', location: 'Cambridge, USA' },
  { id: 4, name: 'TU-Sofia', location: 'Sofia' },
  { id: 5, name: 'Su-Sofia', location: 'Sofia' },
];

uniRouter.get('/', (req, res) => {
  res.json(unis);
});

uniRouter.get('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uni = unis .find((u) => u.id === uniId);
  if (uni) {
    res.json(uni);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

uniRouter.post('/', (req, res) => {
  const newUni = {
    id: unis.length + 1,
    name: req.body.name,
    location: req.body.location,
  };
  unis.push(newUni);
  res.status(201).json(newUni);
});

// PUT to update an existing uni
uniRouter.put('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = unis.findIndex((u) => u.id === uniId);
  if (uniIndex !== -1) {
    unis[uniIndex] = {
      id: uniId,
      name: req.body.name,
      location: req.body.location,
    };
    res.json(unis[uniIndex]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

// DELETE a uni by ID
uniRouter.delete('/:id', (req, res) => {
  const uniId = parseInt(req.params.id);
  const uniIndex = unis.findIndex((u) => u.id === uniId);
  if (uniIndex !== -1) {
    const deletedUni= unis.splice(uniIndex, 1);
    res.json(deletedUni[0]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

export default uniRouter;
