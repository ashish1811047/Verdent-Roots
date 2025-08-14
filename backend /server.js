// server.js

// 1. Import necessary packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// 2. Initialize the Express app
const app = express();
const PORT = 3001;

// 3. Apply middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// ===================================================================================
// IMPORTANT: 
// 1. Go to your MongoDB Atlas dashboard and copy your full connection string.
// 2. Paste it below, completely replacing the placeholder string inside the quotes.
// 3. Replace `<password>` in your pasted string with your actual database password.
// ===================================================================================
const dbConnectionString = "mongodb+srv://verdent_18:Ram%401234@cluster0.wj4wxgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbConnectionString)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch(err => console.error("Error connecting to MongoDB Atlas:", err));
// --- END DATABASE CONNECTION ---


// --- DATABASE SCHEMA & MODEL ---
// This defines the structure of the data we want to save in our database.
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

// This creates a "model" that we can use to create, read, update, and delete documents in our database.
const Contact = mongoose.model('Contact', contactSchema);
// --- END DATABASE SCHEMA & MODEL ---


// --- API ROUTES ---
// This is a test route to make sure the server is running.
app.get('/', (req, res) => {
  res.send('Verdant Roots server is running!');
});

// This is the new API endpoint for handling the contact form submissions.
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContactSubmission = new Contact({
      name,
      email,
      message,
    });

    await newContactSubmission.save();
    
    console.log('New contact form submission saved:', newContactSubmission);

    res.status(201).json({ message: 'Thank you! Your message has been received.' });

  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).json({ message: 'Sorry, something went wrong. Please try again.' });
  }
});
// --- END API ROUTES ---


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
