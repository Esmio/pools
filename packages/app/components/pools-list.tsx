import React, { useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { pools } from "@/stores/Pools";
import PoolsCards from "./pools-cards";
import CreateModal from "./create-modal";

const ListPools = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const toAssetsList = useCallback(() => {
    router.push("/assets-list");
  }, []);

  const onConfirm = useCallback(
    ({ token1, token2 }) => {
      const getShuffledArr = (arr: any[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const rand = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[rand]] = [arr[rand], arr[i]];
        }
        return arr;
      };

      const getRandomId = getShuffledArr(
        [...Array(500)].map((v, i) => (v = i + 1))
      ).slice(0, 1);

      const getRandomPoolLiquidity = [...Array(1)].fill(undefined).map((_) => {
        return parseInt(
          getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .replaceAll(",", "")
        );
      });
      const getRandomAPR = [...Array(1)].fill(undefined).map((_) => {
        return (
          parseInt(
            getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
              .toString()
              .slice(0, 7)
              .replaceAll(",", "")
          ) / 100
        );
      });
      const getRandomMyLiquidity = [...Array(1)].fill(undefined).map((_) => {
        return parseInt(
          getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .toString()
            .slice(0, 5)
            .replaceAll(",", "")
        );
      });
      const newPool = {
        id: getRandomId[0],
        token1,
        token2,
        poolLiquidity: getRandomPoolLiquidity[0],
        apr: getRandomAPR[0],
        myLiquidity: getRandomMyLiquidity[0],
        myBoundedAmount: getRandomMyLiquidity[0],
        longestDaysUnbonding: Math.random() < 0.5,
      };

      pools.addPool(newPool);
    },
    [pools]
  );

  return (
    <Box p={4}>
      <Flex align="center" mb={6}>
        <Heading as="h2" fontSize="2xl" mr={4}>
          Active Pools
        </Heading>
        <Button display={{ base: "none", sm: "block" }} onClick={onOpen}>
          Create New Pool
        </Button>
        <Button
          display={{ base: "none", sm: "block" }}
          ml={2}
          onClick={toAssetsList}
        >
          Assets List
        </Button>
      </Flex>
      <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={1}
          >
            OSMO Price
          </Text>
          <Text fontSize="3xl" fontWeight="bold" py={2}>
            $4.41
          </Text>
        </Box>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={2}
          >
            Reward distribution on
          </Text>
          <Flex align="center">
            <Text fontSize="3xl" fontWeight="bold">
              12
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                H
              </Text>
            </Box>
            <Text fontSize="3xl" fontWeight="bold">
              19
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                M
              </Text>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box
        bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
        m={-4}
        px={4}
        py={6}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My Pools
        </Text>
        <PoolsCards />
      </Box>
      <CreateModal
        title="Create New Pool"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </Box>
  );
};

export default ListPools;
