import { createEventZodSchema } from "@/components/Forms/CreateEventForm";
import z from "zod";

export type Category = {
  id: string;
  description: string;
};

export type Event = z.infer<typeof createEventZodSchema> & {
  id: string;
  category: Category;
};

export type Location = {
  lng: number;
  lat: number;
  address_name: number;
};

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type FilterType = {
  startDate?: string;
  page?: number;
  limit?: number;
  category?: string;
  lng?: number;
  lat?: number;
  address_name?: string;
  radius?: number;
  status?: EventStatus;
};
