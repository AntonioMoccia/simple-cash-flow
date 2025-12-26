import { EventTypeService } from "@/services/event_type.service";
import { success } from "@/lib/send-success";
import { Request, Response, NextFunction } from "express";
export class EventTypeController {
  constructor() {}

/*   async getAll(req: Request, res: Response, next: NextFunction) {
    const eventTypeService = new EventTypeService();
    try {
      const eventTypes = await eventTypeService.getAll();
      success(res, {
        event_types: eventTypes,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { description } = req.body;

    const eventTypeService = new EventTypeService({ description });
    try {
      const newEventType = await eventTypeService.create();

      success(res, {
        event_type: newEventType,
      });
    } catch (error) {
      next(error);
    }
  } */
}
