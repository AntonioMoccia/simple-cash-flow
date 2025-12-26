import { Input } from '@/components/ui/input'
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from '@/components/ui/command'
import { useDebugValue, useEffect, useState } from 'react'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

import { useClickOutside } from '@/hooks/use-clickoutside'
import { useDebounce } from '@/hooks/use-debounce'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Mappa from '@/components/Mappa'
import { Address, AddressValue } from '@/components/Address'
export type AddressType = {
    address: string
    place_id: string
}

function AddressSection() {

    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([])
    const [locationString, setLocationString] = useState("")
    const [location, setLocation] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    const [open, setOpen] = useState(false)
    const [openManualMap, setOpenManualMap] = useState(true)
    const useOnClickOutside = useClickOutside(() => setOpen(false))



    const [coords, setCoords] = useState<{
        lat: number,
        lng: number
    }>({
        lat: 0,
        lng: 0
    })
    const form = useFormContext()
    const dab = useDebounce(locationString, 500)
    useEffect(() => {
        if (isSelected) return
        const searchSuggetions = async () => {
            setSuggestions([])
            if (!dab) return
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google/suggestions?q=${dab}`)
            const response = await request.json()

            setSuggestions(response.suggestions)
        }
        searchSuggetions()
    }, [dab])
    useEffect(() => {
        const getCoords = async () => {
            if (locationString == "") return
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google/coords?place_id=${location}`)
            const response = await request.json()

            form.setValue('location.lat', response.coords.lat)
            form.setValue('location.lng', response.coords.lng)
            setCoords(response.coords)

        }
        getCoords()
    }, [location])

    return (
        <>
            <div ref={useOnClickOutside} className=' col-span-12 md:col-span-6'>
                <FormField
                    control={form.control}
                    name='location.address_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Indirizzo
                            </FormLabel>
                            <div className=' flex gap-2'>
                                <Address
                                    value={field.value}
                                    onChange={(v: AddressValue) => {
                                        form.setValue('location.address_name',v.address)
                                        form.setValue('location.lat',v.lng)
                                        form.setValue('location.lng',v.lat)
                                        form.setValue('location.place_id',v.place_id)
                                    }}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
        </>



    )
}


export default AddressSection