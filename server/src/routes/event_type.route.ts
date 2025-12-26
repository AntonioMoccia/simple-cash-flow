import {EventTypeController} from '@/controllers/event_type.controller'
import {wrap} from '@/lib/wrapAsync'
import {Router} from 'express'

const router = Router()
//const eventTypeController = new EventTypeController()
//const eventTypeWrap = wrap(eventTypeController)

/* router.get("/",eventTypeWrap(eventTypeController.getAll))
router.post("/",eventTypeWrap(eventTypeController.create)) */

export default router