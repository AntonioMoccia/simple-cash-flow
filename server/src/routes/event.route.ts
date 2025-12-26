import { EventController } from "@controllers/event.controller";
import { wrap } from "@lib/wrapAsync";
import { OptionalAuthMiddelware } from "@middelwares/OptionalAuthMiddelware";
import { Router } from "express";

const router = Router();
const eventController = new EventController();
const eventWrap = wrap(eventController);

router.delete("/upload", eventWrap(eventController.removeImageFromCloud));
router.post("/upload", eventWrap(eventController.uploadImageGetSignedUrl));

router.post("/", eventWrap(eventController.createEvent));
router.get("/", OptionalAuthMiddelware, eventWrap(eventController.getEvents));

//ADMIN ROUTE
router.put("/:id", eventWrap(eventController.updateEvent));
router.get("/:id", eventWrap(eventController.getEventById));

export default router;
