import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddresFormater } from "../helpers/AddressFormater";
import { useWindowSize } from "../hooks/useWindowSize";
import { ActionType, AddressData, GeocodingResponse } from "../types/interfaces";
import AddressForm from "./AddressForm";
import LocationButton from "./LocationButton";
import PlacesAutocomplete from "./PlacesAutocomplete";
const ContentCard = () => {
  const [placeSelected, setPlaceSelected] = useState<GeocodingResponse|null>(null)
  const [placeFormated, setPlaceFormated] = useState<AddressData>({
    street:'',
    numExt:'',
    numInt:'',
    suburb:'',
    town:'',
    zip:'',
    city:'',
    state:'',
    country:''
  })

  useEffect(() => {
    if (placeSelected) {
      let formated = AddresFormater(placeSelected)
      setPlaceFormated(formated)
    }
  }, [placeSelected])
  
  const { width }= useWindowSize()
  return (
    <Flex p={{ base: "2", md: "4" }} w="full"  h={`${width > 1024 ?'calc(100vh - 110px)':'100%'}`}>
      <Box boxShadow={{ base: "base", md: "lg" }} p="4" w={`${width > 1024 ?'60%':'100%'}`}>
        <Flex align="center" justify="center">
          <Heading>Datos Personales</Heading>
        </Flex>
        <Text m="4" textAlign="center">
          Dirección
        </Text>
        <LocationButton onSelectPlace={setPlaceSelected}/>
        <Text textAlign="center" p="6">
          O puedes intruducir tu direccion completa en seguida
        </Text>
        <Box w="full">
          <PlacesAutocomplete onSelectPlace={setPlaceSelected}/>
        </Box>
        {placeSelected && <AddressForm action={ActionType.Save} buttonText="Guardar Direccion" afterAction={()=>{setPlaceSelected(null)}} data={placeFormated}/>}
      </Box>
      {width > 1024 && 
      <Box
        w="container.md"
        opacity="0.5"
        bgImage="url('/map.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
      ></Box>}
    </Flex>
  );
};

export default ContentCard;
