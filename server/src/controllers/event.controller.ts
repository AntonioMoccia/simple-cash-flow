import S3 from "@services/S3.service";
import { NextFunction, Request, Response } from "express";
import { EventService } from "@/services/event.service";
import { Event, FilterTypes } from "../types";
import { success } from "@/lib/send-success";

import { EventStatus } from "@lib/generated/prisma";
export class EventController {
  private eventClass: EventService;
  constructor() {
    this.eventClass = new EventService();
  }

  async uploadImageGetSignedUrl(req: Request, res: Response) {
    const { size, contentType, filename } = req.body;

    try {
      const response = await S3.getInstance().getSignedUrl({
        size,
        contentType,
        filename,
      });

      return res.json(response);
    } catch (error) {
      //      console.log(error);
    }
  }
  async removeImageFromCloud(req: Request, res: Response, next: NextFunction) {
    const { key }: { key: string } = req.body;

    try {
      const result = await S3.getInstance().remove(key);

      success(res, { result });
    } catch (error) {}
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query)
      const events = await this.eventClass.getEvents({
        ...(req.query as FilterTypes)
      }, req.user);

      success(res, { ...events });
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const event = await this.eventClass.getEventById(id);

      success(res, { event });
    } catch (error) {
      next(error);
    }
  }
  async getEventsByStatus(req: Request, res: Response, next: NextFunction) {
    const statusParam = req.params.status as string;

    // Controllo che il valore sia un enum valido
    if (!Object.values(EventStatus).includes(statusParam as EventStatus)) {
      return success(res, { events: [] }, "Invalid status value", 400);
    }
    try {
      const events = await this.eventClass.getEventsByStatus(
        statusParam as EventStatus
      );

      success(res, { events });
    } catch (error) {
      next(error);
    }
  }
  async createEvent(req: Request, res: Response, next: NextFunction) {
    const event: Event = req.body;
    //usare i dto per verificare il body
    try {
      const newEvent = await this.eventClass.createEvent(event);
      success(res, {
        event: newEvent,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    console.log(id);

    const { event } = req.body;
    console.log(event);
    try {
      const updatedEvent = await this.eventClass.updateEvent(id, event);
      success(res, {
        event: updatedEvent,
      });
    } catch (error) {
      next(error);
    }
  }
}
