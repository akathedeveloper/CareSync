import express from 'express'
import { createPatient } from '../controllers/patientController.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router();

router.route('/')
  .post(isAuthenticated, createPatient);

export default router;


