"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form'
import FormCard from '@/components/FormCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'


import z from 'zod'

import BaseInfo from './sections/BaseInfo'
import WhereAndWhen from './sections/WhereAndWhen'
import Partecipations from './sections/Partecipations'
import Contacts from './sections/Contacts'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const createEventZodSchema = z.object({
    title: z.string().min(3, "The title must be min 3 chars"),
    id_category: z.string().min(1, "Campo obbligatorio"),
    description: z.string().min(1, "Campo obbligatorio"),
    image: z.string().min(1, "Campo obbligatorio"),
    startAt: z.date("Campo obbligatorio"),
    endAt: z.date().optional(),
    capacity: z.number().optional(),
    location: z.object({
        address_name: z.string().min(1, "Campo obbligatorio"),
        lat: z.number(),
        lng: z.number(),
        place_id: z.string().optional()
    }),
    price: z.number().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    organizer: z.string().min(1, "Campo obbligatorio"),
})

type FormType = z.infer<typeof createEventZodSchema>
export type CreateEventFormType = UseFormReturn<FormType>

function CreateEventForm() {

    const [successSubmit, setSuccessSubmit] = useState<boolean | undefined>(undefined)

    const form = useForm({
        resolver: zodResolver(createEventZodSchema),
        defaultValues: {
            id_category: "",
            description: "",
            image: "",
            price: 0,
            title: "",
            capacity: 0,
            startAt: undefined,
            endAt: undefined,
            location:{
                address_name:"",
                lat: 0,
                lng: 0,
                place_id: "",
            },
            email: "",
            phone: "",
            website: "",
            organizer: ""
        }
    })

    async function onSubmit(values: z.infer<typeof createEventZodSchema>) {

        const payload = {
            ...values,
            startAt: values.startAt.toISOString(),
            endAt: values.endAt?.toISOString(),
        }

        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })


        const newEvent = await request.json()

        if (!newEvent.success) {
            setSuccessSubmit(false)
            toast.success("Evento creato!")
            form.reset()
            return
        }

        setSuccessSubmit(true)
        toast.error("Qualcosa è andato storto! ")
        form.reset()

    }
    useEffect(()=>{
        console.log(form.getValues())
    },[form.watch()])
    
    return (
        <div className=' p-2 py-10 w-full max-w-3xl'>
            <Form {...form}>
                <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className=' flex flex-col justify-start items-center gap-5'>
                        <BaseInfo />
                        <WhereAndWhen />
                        <Partecipations />
                    </div>

                    <div className=' gap-4 flex flex-col'>
                        <p className=' text-sm font-extrabold'>
                            Questi contatti saranno resi pubblici
                        </p>
                        <Contacts />
                    </div>
                    <div className=' w-full flex items-center justify-center'>
                        <Button className='border border-black rounded-md ' size={'lg'} type={'submit'}>
                            Pubblica evento
                        </Button>
                    </div>
                </form>
            </Form>
            {/*  {
                !successSubmit && successSubmit ? (
                    <Card>
                        <CardContent>Richiesta inviata con successo</CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent>Richiesta non inviata</CardContent>
                    </Card>
                )
            } */}
        </div >
    )
}

export default CreateEventForm