import { Event } from "@/types"
import Image from 'next/image'
import { Calendar, MapPin, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from '@/lib/format-date'


function EventCard({ event }: { event: Event }) {

    const router = useRouter()

    return (
        <div
            className="cursor-pointer w-full border border-[#222222] max-w-[200px] bg-transparent text-[#222222] pt-0 transition-shadow rounded-md overflow-hidden h-full flex flex-col"
            onClick={() => router.push(`/events/${event.id}`)}>

            <div className="w-full px-1 pt-1 flex justify-center items-center">
                <div
                    className="relative w-full aspect-[3/4] min-h-[280px] max-h-[420px] rounded overflow-hidden bg-gray-200"
                >
                    {event.image && (
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    )}
                </div>
            </div>

            {/** CARD HEADER */}
            <div className="px-2 mt-2">
               {/*  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className=" border border-[#222222] text-[#EDEDED] text-xs px-2 py-1 rounded-md">{event.category.description}</div>
                    {event.price && event.price > 0 ? (<span className="text-blue-600">{event.price} €</span>) : (<span className="text-blue-600">Gratis</span>)}
                </div>
                <h2 className="line-clamp-2 text-xl text-[#EDEDED] font-black">{event.title}</h2> */}
                <h1 className=" text-xl font-extrabold line-clamp-2">
                    {event.organizer}
                </h1>
            </div>

            {/** CARD CONTENT */}
            <div className=" px-2 py-2 flex flex-col ">
 
                <div className="space-y-2">
                    <div className="flex items-center gap-2 ">
                        <Calendar className="size-4" />
                        <span className="text-sm">
                            {formatDate(event.startAt.toString())}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span className="text-sm">{event.location.address_name}</span>
                    </div>

                    {event.capacity && event.capacity > 0 ? (
                        <div className="flex items-center gap-2 ">
                            <Users className="size-4" />
                            <span className="text-sm">Max {event.capacity} persone</span>
                        </div>
                    ) : (null)}
                </div>
            </div>

        </div>
    )
}

export default EventCard
