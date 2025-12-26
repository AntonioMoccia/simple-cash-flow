import React from 'react'
import { CreateEventFormType } from '../CreateEventForm'
import FormCard from '@/components/FormCard'
import { Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import AddressSection from './AddressSection'
import { DateTimePicker } from '@/components/DataTimePicker'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

//da aggiungere inizio e fine

function WhereAndWhen() {
    const form = useFormContext()
    return (
        <div className="grid grid-cols-12 w-full gap-6">
            <div className='grid grid-cols-2 col-span-12 gap-5 md:col-span-6'>
                <div className="space-y-2 col-span-2">
                    <FormField
                        control={form.control}
                        name='startAt'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DateTimePicker
                                        dataLabel="Data inizio"
                                        label="Data/ora inizio"
                                        value={form.watch("startAt")}
                                        onChange={(d) => form.setValue("startAt", d)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </div>



            <div className='grid grid-cols-2 col-span-12 gap-5 md:col-span-6'>
                <div className="space-y-2 col-span-2 ">
                    <FormField
                        control={form.control}
                        name='endAt'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DateTimePicker
                                        dataLabel="Data fine"
                                        label="Data/ora fine"
                                        value={form.watch("endAt")}
                                        onChange={(d) => form.setValue("endAt", d)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />

                </div>
            </div>



            <AddressSection />
            <div className=' col-span-12 md:col-span-6'>
                <FormField
                    control={form.control}
                    name='organizer'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Organizzatore
                            </FormLabel>

                            <FormControl>
                                <Input
                                    className=' border border-black rounded-md'
                                    placeholder='es. associazione.. o Bar..'
                                    {...field}
                                    type='text'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

    )
}

export default WhereAndWhen