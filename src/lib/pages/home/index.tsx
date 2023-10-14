'use client';

import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AutocompleteInput from '~/lib/components/AutocompleteInput';
import FinishModal from '~/lib/components/FinishModal';
import Header from '~/lib/layout/Header';
import DonationModal from '~/lib/components/DonationModal';
import PixModal from '~/lib/components/PixModal';

import { lastPlayedToday } from '~/lib/utils/cookies';

const Home = () => {
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [canGiveUp, setCanGiveUp] = useState<boolean>(false);
  const [donationModal, setDonationModal] = useState<boolean>(false);
  const [pixModal, setPixModal] = useState<boolean>(false);

  useEffect(() => {
    setCanGiveUp(lastPlayedToday());
  })

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="80vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Header finishOpen={setFinishModal} canGiveUp={canGiveUp} setCanGiveUp={setCanGiveUp} setDonation={setDonationModal} />
      <FinishModal open={finishModal} setOpen={setFinishModal} answer="Sixth Sense, The (1999)" setDonation={setDonationModal} />
      <DonationModal open={donationModal} setOpen={setDonationModal} pixModal={setPixModal}/>
      <PixModal open={pixModal} setOpen={setPixModal} />
      <AutocompleteInput word="Sixth Sense, The (1999)" finishOpen={setFinishModal} setCanGiveUp={setCanGiveUp} />
    </Flex>
  );
};


export default Home;
