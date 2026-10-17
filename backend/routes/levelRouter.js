import express from 'express';
import LevelController from '../controllers/LevelController.js';

const level = new LevelController();
const router = express.Router();

router.post('/', level.postLevel);
router.get('/', level.getLevels);
router.get('/:id', level.getLevelById);
router.delete('/:id', level.deleteLevelById);
router.put('/:id', level.updateLevelById);

export default router;