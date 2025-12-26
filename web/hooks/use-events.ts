import useSWR from "swr";
import { Event, EventStatus } from "@/types";
export const fetcher = (url: string) => fetch(url,{credentials: 'include'}).then((res) => res.json());

type UseEventsResponse = {
  events: Event[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isError: boolean;
};

export function useEvents(filters: {
  category?: string;
  startDate?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
  status?:EventStatus;
}): UseEventsResponse {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events?${query.toString()}`,
    fetcher
  );

  return {
    events: data?.data.events || [],
    total: data?.data.total || 0,
    page: data?.data.page || 1,
    limit: data?.data.limit || 10,
    isLoading: !data && !error,
    isError: error,
  };
}
