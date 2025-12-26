import { GoogleController } from '@controllers/google.controller'
import { wrap } from '@lib/wrapAsync'
import {Request, Response, Router} from 'express'

const router = Router()
const googlecontroller = new GoogleController()
const wrapGoogle = wrap(googlecontroller)

router.get("/suggestions",wrapGoogle(googlecontroller.getSuggestions))
router.get("/coords",wrapGoogle(googlecontroller.getCoords))

export default router