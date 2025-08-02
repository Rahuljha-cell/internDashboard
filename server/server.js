import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dashboardRouter from './routes/dashboardRoutes.js'; // add `.js` if using ES Modules

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Required to parse JSON request bodies


// Health check route
app.get('/', (req, res) => res.send('Server is Live!'));

// Routes
app.use('/api/dashboard', dashboardRouter); // exposes /api/dashboard (as defined inside routes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('✅ Server is running on port', PORT);
});
