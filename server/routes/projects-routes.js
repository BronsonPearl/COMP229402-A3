import express from 'express';
import {
    createProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    updateProject
} from '../controllers/projects-controllers.js';
import authMiddleware, { requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Project data changes during CRUD, so browsers must not reuse cached responses.
router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// REST API simulate CRUD

// READs any signed-in user
router.get("/", authMiddleware, getAllProjects);
router.get("/:id", authMiddleware, getProjectById);

// WRITES admin only
// CREATE
router.post("/", authMiddleware, requireAdmin, createProject);

// UPDATE
router.put("/:id", authMiddleware, requireAdmin, updateProject);

// DELETE
router.delete("/:id", authMiddleware, requireAdmin, deleteProject);

export default router;
