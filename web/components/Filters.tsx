import { FilterType } from "@/types";
import { Address } from "./Address";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect, useState } from "react";

const radius = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

export function Filters({ filters, updateFilter }: { filters: FilterType, updateFilter: (newValues: Partial<FilterType>) => void }) {

    const [categories, setCategories] = useState<{ id: string, description: string }[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
            const res = await req.json();
            setCategories(res.data.categories);
        };
        getCategories();
    }, []);

    return (
        <div className='grid grid-cols-12 gap-2'>

            {/* Address */}
            <div className='col-span-12 md:col-span-4'>
                <Address
                    valueString={filters.address_name || ""}
                    onChange={(values) => {
                        console.log(values);
                        updateFilter({
                            lat: values.lat,
                            lng: values.lng,
                            address_name: values.address,
                        })
                    }}
                />
            </div>

            {/* Radius */}
            <div className='col-span-4 md:col-span-1'>
                <Select
                    value={filters.radius?.toString()}
                    onValueChange={(value) => updateFilter({ radius: Number(value) })}
                >
                    <SelectTrigger className="border border-black rounded-md w-full">
                        <SelectValue placeholder="Distanza (KM)" />
                    </SelectTrigger>

                    <SelectContent>
                        {radius.map(rad => (
                            <SelectItem value={String(rad)} key={rad}>
                                {rad} KM
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Category */}
            <div className='col-span-4 md:col-span-1'>
                <Select
                    value={filters.category ?? ""}
                    onValueChange={(value) => updateFilter({ category: value })}
                >
                    <SelectTrigger className="border border-black rounded-md w-full">
                        <SelectValue placeholder="Categoria" />
                    </SelectTrigger>

                    <SelectContent>
                        {categories.map(cat => (
                            <SelectItem value={cat.id} key={cat.id}>
                                {cat.description}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}