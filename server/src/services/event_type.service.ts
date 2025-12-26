import { EventType } from "@/types/index";
import { prisma } from "@/lib/prisma-client";
export class EventTypeService {
  private eventType: EventType | null | undefined;
  constructor(eventType?: EventType) {
    this.eventType = eventType
  }

  
  async getAll() {
    try {
      const eventType = await prisma.eventType.findMany();
      return eventType;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  } 


  async create() {
    if (!this.eventType) throw Error("EventType undefined");

    try {
      const newEventType = await prisma.eventType.create({
        data: { ...this.eventType },
      });
      return newEventType
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      throw Error(
        "Qualcosa è andato storto nella creazione del tipo di evento"
      );
    }
  }
}
