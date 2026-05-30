import { Router } from 'express'
import {
  solveHandler,
  exampleHandler,
} from '../controllers/solverController.js'

const router = Router()

router.post('/solve',   solveHandler)
router.get('/example',  exampleHandler)

export default router