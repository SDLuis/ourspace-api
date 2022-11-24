/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { v4 } from 'uuid'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join('./public/attachments'),
  filename: (_req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

export default upload
