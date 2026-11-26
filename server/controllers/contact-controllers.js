import ContactModel from '../models/contact-model.js'

// Public: anyone can send a message
export const createContact = async (req, res) => {
    try {
        // Only accept the expected fields
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "name, email and message are required" });
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        await ContactModel.create({ name, email, subject, message });

        res.status(201).json({ message: "Message sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Admin only: read the messages people have sent
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
