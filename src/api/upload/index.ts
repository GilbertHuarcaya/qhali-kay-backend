import { Router } from 'express'
import multer from 'multer'

import {
  uploadSingleHandler,
  uploadArrayHandler
} from './upload.controller'

const router = Router()
const upload = multer({ dest: './temp' })

router.post('/file', upload.single('file'), uploadSingleHandler)
router.post('/files', upload.any(), uploadArrayHandler)

export default router
