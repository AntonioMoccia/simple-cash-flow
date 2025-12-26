import { useDebounce } from "@/hooks/use-debounce";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty
} from '@/components/ui/command'
import { Delete, X } from "lucide-react";
export type AddressValue = {
  address: string;
  place_id: string;
  lat: number;
  lng: number;
};

type AddressBaseProps = {
  value?: AddressValue;
  valueString?: string;
  onChange?: (value: AddressValue) => void;
};

export function Address({ value, valueString = "", onChange }: AddressBaseProps) {
  const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([]);
  const [locationString, setLocationString] = useState(value?.address ?? "");
  const [isSelected, setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(value?.place_id ?? "");
  const debounced = useDebounce(locationString, 500);
  const [valueStringState, setValueStringState] = useState(valueString)
  useEffect(() => {
    if (isSelected) return;
    if (!debounced) return;

    const fetchSuggestions = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/suggestions?q=${debounced}`
      );
      const data = await res.json();
      setSuggestions(data.suggestions);
    };

    fetchSuggestions();
  }, [debounced]);

  useEffect(() => {
    if (!location) return;

    const fetchCoords = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/google/coords?place_id=${location}`
      );
      const data = await res.json();

      onChange?.({
        address: locationString,
        place_id: location,
        lat: data.coords.lat,
        lng: data.coords.lng
      });
    };

    fetchCoords();
  }, [location]);

  return (

    <Command className="border border-[#222] bg-[#F9F9F9] rounded-md w-full shadow-md">
        <CommandInput

          value={locationString ? locationString : valueStringState}
          onValueChange={(str) => {
            setValueStringState("");
            setOpen(true);
            setLocationString(str);
            setIsSelected(false);
          }}
          placeholder="Inserisci indirizzo..."
        />
 

      {open && (
        <CommandList>
          <CommandEmpty>
            Nessun risultato, inserisci un luogo vicino
          </CommandEmpty>

          <CommandGroup heading="Suggerimenti">
            {suggestions.map((s) => (
              <CommandItem
                key={s.place_id}
                value={s.description}
                onSelect={() => {
                  setOpen(false);
                  setLocationString(s.description);
                  setLocation(s.place_id);
                  setIsSelected(true);
                }}
              >
                {s.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>

  );
}