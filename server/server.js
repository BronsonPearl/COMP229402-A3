import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express'; // ES6 and newer javascript

import projectsRoutes from './routes/projects-routes.js';
import userRoutes from './routes/user-routes.js';
import contactRoutes from './routes/contact-routes.js';
//import qualificationRoutes from './routes/qualification-routes.js';





mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection; 
connection.on('error', console.error.bind(console, 'connection error:'));


const app = express(); 

app.use(express.json());

app.use('/projects', projectsRoutes);
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
//app.use('/qualifications', qualificationRoutes);

app.listen(3001);

console.log('Server is running on http://localhost:3001');
