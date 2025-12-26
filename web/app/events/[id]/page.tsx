"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Event } from "@/types"
import { ArrowLeft, Calendar, Clock, MapPin, Navigation, Users } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { formatDate } from '@/lib/format-date'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useClickOutside } from "@/hooks/use-clickoutside"

function EventDetail() {

    const { id } = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    const [showImage, setShowImage] = useState(false)
    const useClickOutsideDialog = useClickOutside(()=>setShowImage(false))
    useEffect(() => {

        const getEvent = async () => {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`)
            const response = await request.json()
            setEvent(response.data.event)
        }
        getEvent()
    }, [id])
    const handleClickShowImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setShowImage(true)
    }
    if (!event) return (<></>)

    return (
        <div className="min-h-screen ">
            {
                showImage && (
                    <div ref={useClickOutsideDialog}>
                        <Dialog open={showImage} modal={true}>
                            <DialogTitle></DialogTitle>
                            <DialogContent>
                                <div className="relative aspect-square overflow-hidden rounded-lg mb-8">
                                    <Image
                                        src={event.image}
                                        alt="cover"
                                        fill
                                        className="w-full h-full object-contain "
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                   </div>
                )
            }
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="  mb-5 ">
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <p >
                        {event.organizer}
                    </p>
                </div>
                {/* Hero Image */}
                {event.image && (
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
                        <Button onClick={handleClickShowImage}>
                            <Image
                                src={event.image}
                                alt="cover"
                                fill
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"

                            />
                        </Button>
                    </div>
                )}
                {/* Title and Badge */}
                <div className="mb-6 text-[#222]">
                    <div className="flex justify-between items-center gap-3 mb-3">
                        <div className=" border border-[#222222] text-[#222222] text-xs px-2 py-1 rounded-md">{event.category.description}</div>
                        {event.price && event.price > 0 ? (<span className="text-blue-600">{event.price} €</span>) : (<span className="text-blue-600">Gratis</span>)}
                    </div>


                </div>
                {/* Description */}
                <div className="mb-4 text-[#222222]">
                    <div className="pt-2">
                        <p className=" leading-relaxed whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>
                </div>
                {/* Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className=" border rounded-md  border-[#222222] bg-[#F9F9F9] text-[#222]">
                        <div>
                            <div className="flex items-center gap-2 py-5 px-2">
                                <Calendar className="size-6" />
                                <span className="text-sm">
                                    {formatDate(event.startAt.toString())}
                                    {event.endAt && ` - ${formatDate(event.endAt.toString())}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" border rounded-md  border-[#222222] bg-[#F9F9F9] text-[#222]">
                        <div>
                            <div className="flex items-center gap-2 py-5 px-2">
                                <MapPin className="size-6" />
                                <div className="flex-1">
                                    <p>{event.location.address_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className=' cursor-pointer  bg-[#222222] text-[#F9F9F9] rounded-md ' onClick={() => console.log('directions')}>
                        <Navigation className="size-5 mr-2" />
                        Ottieni Indicazioni
                    </Button>
                    <Button size="lg" variant="outline" className=' bg-transparent text-[#222222] border border-[#222222] rounded-md '>
                        Condividi Evento
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventDetail