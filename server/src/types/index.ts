import { EventStatus } from "@lib/generated/prisma";
import { InferUser } from "better-auth";
import { auth } from "@lib/auth";

export type Event = {
  title: string;
  id_category: string;
  description: string;
  startAt?: Date;
  endAt?: Date;
  image?: string;
  price: number;
  age?: string;
  email?: string;
  phone?: string;
  website: string;
  organizer: string;
  location: Location;
  capacity?: number;
  userId?:string;
};

export type Location = {
  address_name: string;
  lat: number;
  lng: number;
  place_id?: string;
};
export type Category = {
  description: string;
};
export type EventType = {
  description: string;
};

export type FilterTypes = {
  category?: string;
  startDate?: string;
  lat?: string;
  lng?: string;
  radius?: string; // in km
  page?: number;
  limit?: number;
  status?: EventStatus;
  mine?: boolean;
  search?:string
};

export type Filters = {
  id_category?: string;
  startAt?: { gte: Date };
  location?: {
    lat: number;
    lng: number;
    radius: number; // in km
  };
  status?: EventStatus;
  userId?: string;
  title?: { contains: string; mode: "insensitive" };
};

export type User = InferUser<typeof auth>;
declare global {
  namespace Express {
    interface Request {
      user?: User;
      userId?: string;
    }
  }
}
