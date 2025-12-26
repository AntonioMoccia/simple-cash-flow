"use client"
import EventCard from "@/components/EventCard";
import { Filters } from "@/components/Filters";
import { Pagination } from "@/components/Pagination";
import { useEvents } from "@/hooks/use-events";
import { EventStatus, FilterType } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner"
import { useEffect } from "react";


function SearchEventPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filters: FilterType = {
        address_name: searchParams.get("address_name") || undefined,
        category: searchParams.get("category") || undefined,
        startDate: searchParams.get("startDate") || undefined,
        lat: searchParams.get("lat") ? Number(searchParams.get("lat")) : undefined,
        lng: searchParams.get("lng") ? Number(searchParams.get("lng")) : undefined,
        radius: searchParams.get("radius") ? Number(searchParams.get("radius")) : undefined,
        page: Number(searchParams.get("page") ?? 1),
        limit: Number(searchParams.get("limit") ?? 6),
        status: EventStatus.APPROVED,
    };

    const updateFilters = (newValues: Partial<FilterType>) => {
        const params = new URLSearchParams(searchParams.toString());

        for (const key in newValues) {
            const value = newValues[key as keyof FilterType];

            if (value === undefined || value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }

            if (key !== "page") {
                params.set("page", "1");
            }
        }

        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        updateFilters({ page: newPage });
    };
    const { isLoading, events, isError, limit, page, total } = useEvents(filters);

    useEffect(()=>{
        console.log(events)
    },[events])

    return (
        <div className='flex flex-col justify-center'>
            {/**FILTERS */}
            <div className=' w-full flex  justify-center py-5'>
                <div className='max-w-7xl w-full px-5'>
                    <Filters updateFilter={updateFilters} filters={filters} />
                </div>
            </div>
            <div className=' w-full flex  justify-center'>
                <div className='max-w-7xl w-full px-5'>
                    total events: {total}
                </div>
            </div>
            {/** EVENTS */}
            {
                isLoading ? (
                    <div className=' w-full h-full flex  justify-center py-5'>
                        <div className=' max-w-7xl w-full px-5 flex justify-center'>
                            <Spinner className=" size-10 font-extralight " />
                        </div>
                    </div>
                ) : isError ? (
                    <div className=' w-full flex  justify-center py-10'>
                        <div className='max-w-7xl w-full px-5 text-center text-red-500'>
                            Errore durante il caricamento degli eventi. Per favore prova più tardi.
                        </div>
                    </div>
                ) : events.length === 0 ? (
                    <div className=' w-full flex  justify-center py-10'>
                        <div className='max-w-7xl w-full px-5 text-center'>
                            Nessun evento trovato con i filtri selezionati.
                        </div>
                    </div>
                ) : (
                    <>
                        {/** CARDS */}
                        <div className=' w-full flex  justify-center py-5'>
                            <div className='max-w-7xl grid grid-cols-12 gap-6 md:gap-10 px-2'>
                                {
                                    events.map(event => (
                                        <div key={event.id} className=' col-span-6 md:col-span-4 '>
                                            <EventCard event={event} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/** PAGINATION */}
                        <div className=' w-full flex  justify-center py-5'>
                            <div className=' max-w-7xl px-5 w-full'>
                                <Pagination
                                    page={page}
                                    total={total}
                                    limit={limit}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default SearchEventPage