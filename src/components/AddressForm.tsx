import {
  Box,
  BoxProps,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Switch,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { addressInitialData } from "../helpers/data";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddressData, AddressDataProps } from "../types/interfaces";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { deleteData, saveData, updateData } from "../helpers/services";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const AddressForm = ({
  data,
  afterAction,
  buttonText,
  action,
  idForUpdate,
}: AddressDataProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(false);
  const [disableActive, setDisableActive] = useState<boolean>(
    action == "save" ? false : true
  );
  const [place, setPlace] = useState<AddressData>(data);

  useEffect(() => {
    setPlace(data);
  }, [data]);

  const onChange = (event: { target: HTMLInputElement }) => {
    setModified(true);
    setPlace((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.name == "numExt"
          ? Number(event.target.value)
          : event.target.value,
    }));
  };

  const saveLocation = () => {
    setLoading(true);
    saveData(place)
      .then((res) => {
        setPlace(addressInitialData);
        Notify.success("Guardamos tu direccion con ¡Exito!");
        setLoading(false);
        afterAction();
      })
      .catch((err) => {
        Notify.failure("ups! tubimos un problema, intenta mas tarde");
        setLoading(false);
      });
  };

  const updateLocation = () => {
    if (!modified) {
      Notify.info("No has echo cambios aun");
      return;
    }
    setLoading(true);
    updateData(place, idForUpdate!)
      .then((res) => {
        Notify.success("Actualizamos tu direccion con ¡Exito!");
        setDisableActive(true);
        setLoading(false);
        afterAction();
      })
      .catch((err) => {
        Notify.failure("ups! tubimos un problema, intenta mas tarde");
        setLoading(false);
      });
  };
  const deleteLocation = () => {
    setLoading(true);
    deleteData(idForUpdate!)
      .then((res) => {
        setLoading(false);
        Report.success(
          "Accion Complete",
          "Se ha eliminado la dirrecion",
          "Ok",
          () => {
            router.push("/address");
          }
        );
      })
      .catch((err) => {
        Notify.failure("ups! tubimos un problema, intenta mas tarde");
        setLoading(false);
      });
  };

  const confirmDeleteAction = () => {
    Confirm.show(
      "Confirma Tu Accion",
      "¿Deseas eliminar permanentemente esta direccion?",
      "Si",
      "No",
      () => {
        deleteLocation();
      },
      () => {},

      {
        titleColor: "#FE6D73",
        okButtonBackground: "#FE6D73",
      }
    );
  };

  const ValidateForm = () => {
    const { street, numExt, numInt, suburb, town, zip, city, state, country } =
      place;
    if (
      street == "" ||
      numExt == "" ||
      suburb == "" ||
      town == "" ||
      zip == "" ||
      city == "" ||
      state == "" ||
      country == ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box
      as="form"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      borderRadius="lg"
    >
      {action == "update" && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb="4"
          w="full"
        >
          <Text fontSize="xl">Detalles de tu dirreccion</Text>
          <IconButton
            colorScheme="gray"
            aria-label="Search database"
            icon={disableActive ? <EditIcon /> : <CloseIcon />}
            onClick={() => {
              setDisableActive(!disableActive);
            }}
          />
        </Flex>
      )}
      <Divider />
      {ValidateForm() == true && (
        <Text p="1" align="center" color="red.400">
          Rellena los campos requeridos *
        </Text>
      )}
      <Stack
        spacing="5"
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
      >
        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="street" isInvalid={place.street == ""}>
            <FormLabel fontSize="small">Calle *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="street"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.street}
            />
          </FormControl>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl id="numExt" isInvalid={place.numExt == ""}>
              <FormLabel fontSize="small">Num. Ext. *</FormLabel>
              <Input
                isRequired
                disabled={disableActive}
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
                disabled={disableActive}
                name="numInt"
                onChange={(e) => {
                  onChange(e);
                }}
                value={place.numInt || ""}
              />
            </FormControl>
          </Stack>
        </Stack>

        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="suburb" isInvalid={place.suburb == ""}>
            <FormLabel fontSize="small">Colonia *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="suburb"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.suburb}
            />
          </FormControl>
          <FormControl id="town" isInvalid={place.town == ""}>
            <FormLabel fontSize="small">Municipio / Delegación *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="town"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.town}
            />
          </FormControl>
          <FormControl id="zip" w="80" isInvalid={place.zip == ""}>
            <FormLabel fontSize="small">Codigo Postal *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="zip"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.zip}
            />
          </FormControl>
        </Stack>

        <Stack spacing="6" direction={{ base: "column", md: "row" }}>
          <FormControl id="city" isInvalid={place.city == ""}>
            <FormLabel fontSize="small">Ciudad *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="city"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.city}
            />
          </FormControl>

          <FormControl id="state" isInvalid={place.state == ""}>
            <FormLabel fontSize="small">Estado *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
              name="state"
              onChange={(e) => {
                onChange(e);
              }}
              value={place.state}
            />
          </FormControl>
          <FormControl id="country" isInvalid={place.country == ""}>
            <FormLabel fontSize="small">Pais *</FormLabel>
            <Input
              isRequired
              disabled={disableActive}
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
          disabled={ValidateForm()}
          isLoading={loading}
          loadingText="Guardando tus datos"
          onClick={() => {
            if (action == "update") {
              updateLocation();
            } else {
              saveLocation();
            }
          }}
          variant="outline"
          colorScheme="blue"
        >
          {buttonText}
        </Button>
        {
          action=='update' && <Button
          isLoading={loading}
          loadingText="Eliminando"
          onClick={() => {
            confirmDeleteAction()
          }}
          variant="outline"
          colorScheme="orange"
          mr="4"
          
        >
          Eliminar Direccion
        </Button>
        }
      </Flex>
    </Box>
  );
};

export default AddressForm;
