import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Uploader } from '@/components/Uploader'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'



function BaseInfo() {
    const [categories, setCategories] = useState<{ id: string, description: string }[]>([])
    const form = useFormContext()

    useEffect(() => {
        const getCategories = async () => {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`)
            const response = await request.json()
            console.log(response)
            setCategories(response.data.categories)
        }
        getCategories()
    }, [])

    useEffect(() => {
        console.log("valori: ", form.getValues())
    }, [form])

    return (

        <div className=' w-full flex flex-col gap-5'>
            <div className='grid gap-5 grid-cols-2'>
                <div className='space-y-2 col-span-2 md:col-span-1  '>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Titolo *</FormLabel>
                                    <FormControl>
                                        <Input className=' border border-black rounded-md' type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </div>
                <div className='space-y-2 col-span-2 md:col-span-1'>
                    <FormField
                        control={form.control}
                        name="id_category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>

                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}  // o value={field.value}

                                    >
                                        <SelectTrigger className=" border border-black rounded-md w-full">
                                            <SelectValue placeholder="Seleziona la categoria" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map(category => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.description}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

            </div>
            <div className=' col-span-1'>
                <div className=' w-full'>
                    <FormField
                        name='description'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='h-full'>
                                <FormLabel>
                                    Descrizione
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} className=' border border-black rounded-md h-40' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </div>
            <div className=' col-span-1'>
                <div className=' w-full md:col-span-1'>
                    <Uploader />
                </div>
            </div>
        </div>
    )
}

export default BaseInfo