import {
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getGeocode } from "use-places-autocomplete";
import { usePosition } from "../hooks/usePosition";
import { GeocodingArrayResponse, GeocodingResponse, OnSelectPlaceProps } from "../types/interfaces";

const LocationButton = ({onSelectPlace}:OnSelectPlaceProps) => {
  const [suggestions, setSuggestions] = useState<GeocodingArrayResponse>([]);
  const { latitude, longitude,timestamp ,getPosition } = usePosition();

  const getDataFromGeocode = async () => {
    getGeocode({
      location: {
        lat: latitude,
        lng: longitude,
      }
    })
      .then((results: GeocodingArrayResponse) => {
        setSuggestions(results);
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const onSelect = (value: GeocodingResponse) => {
    onSelectPlace(value);
    setSuggestions([]);
  };

  useEffect(() => {
    if (latitude && longitude) {
      getDataFromGeocode();
    }
  }, [latitude, longitude,timestamp]);


  return (
    <Box>
      <Flex align="center" justify="center">
        <Button
          onClick={() => {
            getPosition();
          }}
        >
          Obtener de mi ubicacion <Icon ml="1" as={FaMapMarkerAlt} />
        </Button>
      </Flex>
      {suggestions.length != 0 && (
        <>
        <Text  m="4"  textAlign="center" textDecoration="underline">
          Selecciona la ubicacion mas cercana a tu dirrecion
        </Text>
        <List
          spacing={3}
          p="2"
          m="6"
          border="1px"
          borderColor="gray.200"
          borderRadius="2xl"
        >
          {suggestions.map((suggestion: GeocodingResponse) => {
            const { formatted_address, place_id } = suggestion;
            return (
              <ListItem
                cursor="pointer"
                key={place_id}
                onClick={() => {
                  onSelect(suggestion);
                }}
              >
                <ListIcon as={FaMapMarkerAlt} color="brand.200" />
                <strong>{formatted_address}</strong>
              </ListItem>
            );
          })}
        </List>
        </>
      )}
    </Box>
  );
};

export default LocationButton;
