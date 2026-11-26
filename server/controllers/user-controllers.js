import UserModel from '../models/user-model.js'
import generateToken from '../utils/jwt.js'

// CRUD - Create, Read, Update, Delete

// Remove the password hash before sending a user back to the client
const sanitize = (user) => {
    const obj = user.toObject();
    delete obj.password;
    return obj;
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email and password are required" });
        }

        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const newUser = new UserModel({ username, email, password });
        const savedUser = await newUser.save(); // role defaults to 'user'

        const token = generateToken(savedUser);

        res.status(201).json({ user: sanitize(savedUser), token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const { username, email, password } = req.body;
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;

 
        await user.save();

        res.status(200).json(sanitize(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({ message: "Login Successful", token, user: sanitize(user) });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
