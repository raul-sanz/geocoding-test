import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { addressInitialData } from "../helpers/data";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddressData, AddressDataProps } from "../types/interfaces";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const AddressForm = ({ data }: AddressDataProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useLocalStorage<AddressData|string>("location",'');
  const [place, setPlace] = useState<AddressData>(data);
  useEffect(() => {
    setPlace(data);
  }, [data]);

  const onChange = (event: { target: HTMLInputElement }) => {
    setPlace((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const saveLocation = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLocation(place)
      setPlace(addressInitialData)
      Notify.success('Guardamos tu direccion con ¡Exito!');
    }, 3000);
  };

  return (
    <Box
      as="form"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      borderRadius="lg"
    >
      <Divider />
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="street">
            <FormLabel fontSize="small">Calle</FormLabel>
            <Input
              name="street"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.street}
            />
          </FormControl>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl id="numExt">
              <FormLabel fontSize="small">Num. Ext.</FormLabel>
              <Input
                name="numExt"
                onChange={(e) => {
                  onChange(e);
                }}
                value={place.numExt}
                type="number"
              />
            </FormControl>
            <FormControl id="numInt">
              <FormLabel fontSize="small">Num. Int.</FormLabel>
              <Input
                name="numInt"
                onChange={(e) => {
                  onChange(e);
                }}
                value={place.numInt}
              />
            </FormControl>
          </Stack>
        </Stack>

        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="suburb">
            <FormLabel fontSize="small">Colonia</FormLabel>
            <Input
              name="suburb"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.suburb}
            />
          </FormControl>
          <FormControl id="town">
            <FormLabel fontSize="small">Municipio / Delegación</FormLabel>
            <Input
              name="town"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.town}
            />
          </FormControl>
          <FormControl id="zip" w="80">
            <FormLabel fontSize="small">Codigo Postal</FormLabel>
            <Input
              name="zip"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.zip}
            />
          </FormControl>
        </Stack>

        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="city">
            <FormLabel fontSize="small">Ciudad</FormLabel>
            <Input
              name="city"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.city}
            />
          </FormControl>

          <FormControl id="state">
            <FormLabel fontSize="small">Estado</FormLabel>
            <Input
              name="state"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.state}
            />
          </FormControl>
          <FormControl id="country">
            <FormLabel fontSize="small">Pais</FormLabel>
            <Input
              name="country"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.country}
            />
          </FormControl>
        </Stack>
      </Stack>
      <Divider />
      <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
        <Button
        isLoading={loading}
        loadingText='Guardando tus datos'
          onClick={() => {
            saveLocation();
          }}
          variant="outline"
          colorScheme="blue"
        >
          Confirmar datos
        </Button>
      </Flex>
    </Box>
  );
};

export default AddressForm;
