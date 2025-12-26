"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { Separator } from '@/components/ui/separator'
export function DateTimePicker({ label, value, onChange, dataLabel }: {
  label: string
  value?: Date
  dataLabel: string
  onChange: (date: Date) => void
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("00:00:00")
  const [full, setFull] = useState<Date | undefined>()
  const combine = (d: Date | undefined, timeString: string) => {
    if (!d) return
    const [h, m, s] = timeString.split(":").map(Number)
    const newDate = new Date(d)
    newDate.setHours(h, m, s || 0)
    return newDate
  }

  const handleDateChange = (d: Date | undefined) => {
    setDate(d)
    const fullResult = combine(d, time)
    setFull(fullResult)
    if (fullResult) onChange(fullResult)
  }

  const handleTimeChange = (t: string) => {
    setTime(t)
    const fullResult = combine(date, t)
    setFull(fullResult)
    if (fullResult) onChange(fullResult)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="px-1">{label}</Label>

      <div className="flex gap-3">

        {/* DATE PICKER */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className=" bg-[#F9F9F9]   border border-black d w-full justify-between font-normal">
              {full ? `${full?.toLocaleDateString()} ${full?.toLocaleTimeString()}` : dataLabel}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => {
                handleDateChange(d!)
              }}
            />
            <Separator />
            <div className=" items-center justify-center px-2 flex">
              <div>
                <p className=" text-sm">
                  Ora:
                </p>
              </div>
              <Input
                type="time"
                step="1"
                className="bg-background w-4/6 m-2 appearance-none "
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
              />

            </div>
              <div className="py-2 px-5">
                <Button className=" w-full" size={'lg'} onClick={()=>{
                  setOpen(false)
                }}>
                  Imposta
                </Button>
              </div>
          
          </PopoverContent>
        </Popover>
          
        {/* TIME PICKER */}

      </div>
    </div>
  )
}
