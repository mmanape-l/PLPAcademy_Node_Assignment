const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(express.json());

const mockUser = {
  username: 'user1',
  passwordHash: '$2b$10$D4.sF/XZqFZkWKm4LQ5fOu5L3Q.TJctb15Pbiv0jlJvRyZ3p7VWqe' // hashed password for 'password123'
};
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== mockUser.username) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, mockUser.passwordHash, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock expense data (in a real application, use a database)
const expenses = [
  { userId: 1, amount: 50 },
  { userId: 1, amount: 75 },
  { userId: 2, amount: 100 },
  { userId: 1, amount: 25 }
];

// GET /api/expense endpoint to calculate total expense for a user
app.get('/api/expense', (req, res) => {
  const userId = parseInt(req.query.userId, 10);

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Filter expenses by userId and calculate the total
  const userExpenses = expenses.filter(expense => expense.userId === userId);
  const totalExpense = userExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Return total expense as JSON response
  res.json({ userId, totalExpense });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
const { body, validationResult } = require('express-validator');

app.post('/api/auth/login', 
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // ...authentication code
  }
);


