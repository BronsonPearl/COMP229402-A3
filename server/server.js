import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express'; // ES6 and newer javascript
import path from 'path';
import { fileURLToPath } from 'url';

import projectsRoutes from './routes/projects-routes.js';
import userRoutes from './routes/user-routes.js';
import contactRoutes from './routes/contact-routes.js';
//import qualificationRoutes from './routes/qualification-routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Establish DB Connection
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection; 
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const app = express(); 

app.use(express.json()); // for parsing application/json

// API routes. Authentication and admin checks are applied inside each router.
app.use('/api/projects', projectsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
//app.use('/api/qualifications', qualificationRoutes);

// Serve the built React app (run `npm run build` first)
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// Let React Router handle page URLs like /projects on refresh
app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);
