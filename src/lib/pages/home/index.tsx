'use client';

import { Flex } from '@chakra-ui/react';

import AutocompleteInput from '~/lib/components/AutocompleteInput';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <AutocompleteInput word='Legally Blonde (2001)' />
    </Flex>
  );
};


export default Home;
