import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaHandHoldingHeart, FaSignOutAlt } from 'react-icons/fa';
import { MdMovieFilter } from 'react-icons/md';

import ThemeToggle from './ThemeToggle';
import GiveUpModal from '../components/GiveUpModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { lastPlayedToday } from '../utils/cookies';

type HeaderProps = {
  finishOpen: Dispatch<SetStateAction<boolean>>,
  canGiveUp: boolean,
  setCanGiveUp: Dispatch<SetStateAction<boolean>>,
  setDonation: Dispatch<SetStateAction<boolean>>
}

const Header = (props:HeaderProps) => {
  const [giveUp, setGiveUp] = useState<boolean>(false);

  return (
    <Flex as="header" width="full" align="center">
      <GiveUpModal open={giveUp} setOpen={setGiveUp} setFinishOpen={props.finishOpen} setCanGiveUp={props.setCanGiveUp} />
      <Box>
        <Heading as="h1" size="md" display="flex" flexDirection="row" alignItems="center">
          <MdMovieFilter /> GuessTheMovie
        </Heading>
      </Box>
      <Flex flexDirection="row" alignItems="flex-end" justifyContent="flex-end" w="100%">
        <Box marginX={1.5}>
          <IconButton
            aria-label="give up"
            icon={<FaSignOutAlt />}
            isDisabled={props.canGiveUp}
            onClick={() => {
              setGiveUp(true);
            }}
          />
        </Box>
        <Box marginX={1.5}>
          <IconButton
            aria-label="donate"
            icon={<FaHandHoldingHeart />}
            onClick={() => {
              props.setDonation(true);
            }}
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
