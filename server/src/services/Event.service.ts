import { EventStatus } from "@lib/generated/prisma";
import { FilterTypes, Event, User, Filters } from "../types/index";
import { prisma } from "@lib/prisma-client";
import parseQueryNumber from "@lib/parse-query-number";
import { getPagination } from "@lib/pagination";
import { getDistanceFromRad } from "@lib/get-distance-from-rad";
import { parseISO } from "date-fns";

export class EventService {
  constructor() {}

  async changeEventStatus(id: string, status: EventStatus) {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: { status },
      });
      return updatedEvent;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Qualcosa è andato storto nel cambio dello stato dell'evento"
      );
    }
  }
  async updateEvent(id: string, eventData: Partial<Event>) {
    try {
      // Extract relational fields and prepare a Prisma-compatible payload
      const { id_category, location, ...rest } = eventData || {};
      const data: any = { ...rest };

      if (id_category) {
        // map category id to Prisma connect shape
        data.category = { connect: { id: id_category } };
      }

      if (location) {
        // map location to nested update (adjust fields as needed)
        data.location = {
          update: {
            address_name: (location as any).address_name,
            place_id: (location as any).place_id,
            lat: (location as any).lat,
            lng: (location as any).lng,
          },
        };
      }

      const updatedEvent = await prisma.event.update({
        where: { id },
        data,
        include: { location: true, category: true },
      });
      return updatedEvent;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Qualcosa è andato storto nell'aggiornamento dell'evento"
      );
    }
  }

  async getEventsByStatus(status: EventStatus) {
    console.log(status);
    try {
      const events = await prisma.event.findMany({
        where: { status },
        include: {
          category: true,
          location: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return events;
    } catch (error) {
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }
  async getEventById(id: string) {
    try {
      const event = await prisma.event.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          location: true,
        },
      });
      return event;
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nell'estrazione dell'evento");
    }
  }
  async getEvents(_filters: FilterTypes, user?: User) {
    try {
      const {
        category,
        startDate,
        search,

        lat,
        lng,
        radius, // in km

        page = "1",
        limit = "10",

        status,
      } = _filters || {};

      const statusFilter = this.getStatusFilter(status, user);
      //creazione filtri
      const filters: Filters = { ...statusFilter };

      if (category) {
        filters.id_category = category;
      }

      if(search) {
        filters.title = { contains: search, mode: "insensitive" };
      }

      if (startDate) {
        filters.startAt = {
          gte: parseISO(startDate as string),
        };
      }

      let events = await prisma.event.findMany({
        where: { ...filters },
        include: { location: true, category: true },
      });


      // Filtraggio per distanza se lat/lng/radius presenti
      if (lat && lng && radius) {
        const latNum = parseFloat(lat as string);
        const lngNum = parseFloat(lng as string);
        const radiusKm = parseFloat(radius as string);

        events = events.filter((event) => {
          if (!event.location) return false;
          const distance = getDistanceFromRad(
            latNum,
            lngNum,
            event.location.lat,
            event.location.lng
          );
          return distance <= radiusKm;
        });
      }

      //pagination
      const pageParsed = parseQueryNumber(page as string, 1);
      const limitParsed = parseQueryNumber(limit as string, 10);

      const { pageNumber, pageSize, start, end } = getPagination({
        page: pageParsed,
        limit: limitParsed,
      });

      const paginatedEvents = events.slice(start, end);

      return {
        total: events.length,
        page: pageNumber,
        limit: pageSize,
        events: paginatedEvents,
      };
    } catch (error) {
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }


  async createEvent(event: Event) {
    if (!event) throw new Error("l'oggetto event non puo essere vuoto");
    try {
      const newEvent = await prisma.event.create({
        data: {
          ...event,
          title: event.title,
          image: event.image!,
          userId: event.userId,
          location: {
            create: {
              address_name: event.location.address_name,
              place_id: event.location.place_id,
              lat: event.location.lat,
              lng: event.location.lng,
            },
          },
        },
      });

      await prisma.tempImage.delete({
        where: {
          url: event.image,
        },
      });

      return newEvent;
    } catch (error) {
      throw new Error("Qualcosa è andato storto nella creazione dell'evento");
    }
  }
  getStatusFilter(status?: EventStatus, user?: User) {
    if (!status || status === "approved" || !user?.role) {
      return { status: "approved" as EventStatus };
    }
    console.log(user.role)
    if (user.role === "admin") {
      return { status }; // admin può vedere qualsiasi status
    }

    return { status: "approved" as EventStatus }; // fallback sicuro
  }
}
