import { Router } from 'express'
import {
  solveHandler,
  exampleHandler,
  historyHandler,
} from '../controllers/solverController.js'

const router = Router()

router.post('/solve',   solveHandler)
router.get('/example',  exampleHandler)
router.get('/history',  historyHandler)

export default router