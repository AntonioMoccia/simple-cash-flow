"use client"
import EventCard from '@/components/EventCard';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEvents } from '@/hooks/use-events';
import { EventStatus } from '@/types';
import { useState } from 'react'



function StagedEventPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, isError, page, total, limit, events } = useEvents({ page: pageNumber, limit: 10, status: EventStatus.PENDING });
    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
    }


    const handleStatusChange = (eventId: string, status: 'approved' | 'rejected') => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: { status: status } })
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally, refresh the events list or update the UI accordingly
            })
            .catch((error) => {
                console.error('Error:', error);
            });   
    }

    return (
        <div>
            <h1 className=' text-center py-5 text-xl'>
                Eventi in attesa di approvazione
            </h1>
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
                            <div className=' max-w-7xl grid grid-cols-12 gap-5 md:gap-10 px-5'>
                                {
                                    events.map(event => (
                                        <div key={event.id} className=' col-span-12 md:col-span-4 '>
                                            <EventCard event={event} />
                                            <Button onClick={()=>{
                                                handleStatusChange(event.id,'rejected')
                                            }}>reject</Button>
                                            <Button  onClick={()=>{
                                                handleStatusChange(event.id,'approved')
                                            }}>approve</Button>
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

export default StagedEventPage