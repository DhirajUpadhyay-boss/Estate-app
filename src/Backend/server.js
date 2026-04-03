require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const researchRoutes = require('./routes/researchRoutes');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT || 3055;

app.use(cors());
app.use(express.json());

app.use('/api/research', researchRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// 404 handler (runs when no route matches)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : (err.message || 'Request failed');

  res.status(statusCode).json({ message });
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e.message);
    process.exit(1);
  }
}

start();
