import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaHandHoldingHeart, FaSignOutAlt } from 'react-icons/fa';
import { MdMovieFilter } from 'react-icons/md';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Box>
        <Heading as="h1" size="md" display="flex" flexDirection="row" alignItems="center">
          <MdMovieFilter /> GuessTheMovie
        </Heading>
      </Box>
      <Flex flexDirection="row" alignItems="flex-end" justifyContent="flex-end" w="100%">
        <Box marginX={1.5}>
          <IconButton
            aria-label="theme toggle"
            icon={<FaSignOutAlt />}
          />
        </Box>
        <Box marginX={1.5}>
          <IconButton
            aria-label="theme toggle"
            icon={<FaHandHoldingHeart />}
          />
        </Box>
        <Box marginX={1.5}>
          <ThemeToggle />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
