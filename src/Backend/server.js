const express = require('express');
const cors = require('cors');
const researchRoutes = require('./routes/researchRoutes');

const app = express();
const PORT = process.env.PORT || 3055;

app.use(cors());
app.use(express.json());

app.use('/api/research', researchRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
