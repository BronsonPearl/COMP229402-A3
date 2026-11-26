import express from 'express';
import { createContact, getAllContacts } from '../controllers/contact-controllers.js';
import protect, { requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// public: send a message
router.post("/", createContact);

// admin only: read messages
router.get("/", protect, requireAdmin, getAllContacts);

export default router;
