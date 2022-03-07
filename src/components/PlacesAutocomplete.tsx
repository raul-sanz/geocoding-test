import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Box, Input } from "@chakra-ui/react";
import SuggestionsList from "./SuggestionsList";
import { AutocompletePredictions, GeocodingArrayResponse, GeocodingResponse, OnSelectPlaceProps } from "../types/interfaces";
import { useEffect } from "react";

const PlacesAutocomplete = ({onSelectPlace}:OnSelectPlaceProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });


  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (event: { target: HTMLInputElement }) => {
    setValue(event.target.value);
  };

  const handleSelect = ({ description }:AutocompletePredictions) => {
    setValue(description, false);
    clearSuggestions();
    getGeocode({ address: description })
      .then((results: GeocodingArrayResponse) => {
        onSelectPlace(results[0])
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  return (
    <>
      <Box p="4" ref={ref}>
        <Input
          w="full"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Cual es tu direccion completa?"
        />
        {status === "OK" && (
          <SuggestionsList data={data} onSelect={handleSelect} />
        )}
      </Box>
    </>
  );
};

export default PlacesAutocomplete;
