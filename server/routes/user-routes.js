import express from 'express';
import {
   createUser,
   updateUser,
   updateUserRole,
   deleteUser,
   getAllUsers,
   getUserById,
   loginUser
} from '../controllers/user-controllers.js';
import protect, { requireAdmin } from '../middlewares/auth.js'; 

const router = express.Router();

// REST API simulate CRUD

// public
router.post("/", createUser);      // sign-up
router.post("/login", loginUser);

// reads, any signed-in user
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);

// writes, admin only
router.put("/:id", protect, requireAdmin, updateUser);
router.delete("/:id", protect, requireAdmin, deleteUser);
router.put("/:id/role", protect, requireAdmin, updateUserRole);

export default router;
