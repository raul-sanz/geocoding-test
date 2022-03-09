import {
  Container,
  Divider,
  Icon,
  List,
  ListItem,
  Stat,
  StatHelpText,
  StatLabel,
  Text,
  useColorMode
} from "@chakra-ui/react";
import { GetServerSideProps } from "next/types";
import Header from "../../components/Header";
import prisma from "../../lib/prisma";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import {
  AddressDataResponse,
  AddressDataResponseArrayProps,
} from "../../types/interfaces";
import { useRouter } from "next/router";

const AddressPage = ({ addresses }: AddressDataResponseArrayProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <>
      <Container>
        <Text py="4" align="center" fontSize="lg">Tus Dirreciones Guardadas</Text>
        <List spacing={3}>
          {addresses &&
            addresses.map((address: AddressDataResponse) => (
              <ListItem
                onClick={() => {
                  router.push({
                    pathname: `/address/[id]`,
                    query: { id: address.id },
                  });
                }}
                key={address.id}
                p="1"
                cursor="pointer"
                _hover={{
                  background: colorMode == 'dark' ? "gray.700" :"gray.100",
                  borderRadius: "10px",
                }}
              >
                <Stat>
                  <StatLabel>
                    <Icon as={FaMapMarkerAlt} color="gray.300" />{" "}
                    {`${address.street} #${address.numExt} ${
                      address.numInt ? `Int. ${address.numInt}` : ""
                    } CP. ${address.zip}`}
                  </StatLabel>
                  <StatHelpText opacity="0.5">
                    <Icon as={FaCity} color="gray.300" />{" "}
                    {`${address.town}, ${address.city}, ${address.country} `}
                  </StatHelpText>
                </Stat>
                <Divider />
              </ListItem>
            ))}
        </List>
      </Container>
    </>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const addresses = await prisma.address.findMany({});
  return {
    props: { addresses },
  };
};
