import {
  Box,
  Stack,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [] = useState(false);
  return (
    <Box
      as="section"
      bg="brand.100"
      m={{ base: "1", md: "4" }}
      p={{ base: "4", md: "4" }}
      borderRadius="15"
    >
      <Stack
        spacing="12"
        direction={{ base: "row", md: "row" }}
        justify="space-between"
      >
        <Link href="/">
          <Image
            width="150px"
            objectFit="contain"
            src="/micompalogo.png"
            alt="Dan Abramov"
          />
        </Link>
        <Box display="flex" alignItems="center">
          <Box mr="5">
            <IconButton
              colorScheme={colorMode === "light" ? "whiteAlpha" : "blackAlpha"}
              variant="solid"
              isRound
              aria-label="Toggle light dark mode"
              onClick={toggleColorMode}
              icon={
                colorMode === "light" ? (
                  <MoonIcon boxSize="5" />
                ) : (
                  <SunIcon boxSize="5" />
                )
              }
            />
          </Box>

          <Box>
            <Menu>
              <MenuButton
                colorScheme="brand.200"
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon boxSize="8" />}
              />
              <MenuList>
              <Link href="/address">
                <MenuItem icon={<Icon as={FaMapMarkerAlt} />}>
                 Mis Direcciones
                </MenuItem></Link>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
