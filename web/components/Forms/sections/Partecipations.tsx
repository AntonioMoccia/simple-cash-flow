import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel } from '@/components/ui/select'
import { CreateEventFormType } from '../CreateEventForm'
import { FormControl, FormItem, FormMessage, FormLabel, FormField } from '@/components/ui/form'
import Age from './Age'
import { useFormContext } from 'react-hook-form'
function Partecipations() {
    const form = useFormContext()
    return (
        <div className="grid  md:grid-cols-3 gap-10  w-full">

            <div className="space-y-2 col-span-1">
                <FormField
                    name='price'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="price" className="text-gray-700">
                                Prezzo (€)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                                    id="price"
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="  border border-black rounded-md  focus:border-gray-900 focus:ring-gray-900"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/*             <Age form={form} /> */}
        </div>

    )
}

export default Partecipations