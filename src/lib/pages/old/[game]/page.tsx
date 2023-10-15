'use client';

import { notFound } from 'next/navigation'

import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState} from 'react';

import AutocompleteInput from '~/lib/components/AutocompleteInput';
import FinishModal from '~/lib/components/FinishModal';
import Header from '~/lib/layout/Header';
import DonationModal from '~/lib/components/DonationModal';
import PixModal from '~/lib/components/PixModal';
import CreditsModal from '~/lib/components/CreditsModal';
import OldGamesModal from '~/lib/components/OldGamesModal';
import { useParams } from 'next/navigation'

import { alreadyPlayedThisGame } from '~/lib/utils/cookies';
import Footer from '~/lib/layout/Footer';

export default function Old () {
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [canGiveUp, setCanGiveUp] = useState<boolean>(false);
  const [donationModal, setDonationModal] = useState<boolean>(false);
  const [pixModal, setPixModal] = useState<boolean>(false);
  const [creditsModal, setCreditsModal] = useState<boolean>(false);
  const [oldGamesModal, setOldGamesModal] = useState<boolean>(false);
  const [movie, setMovie] = useState<string|null>(null);
  const [gameNumber, setGameNumber] = useState<number>(0);
  const params = useParams();

  function getGameNumber() {
    if (Array.isArray(params.game)) {
      return params.game[0];
    } else {
      return params.game;
    }
  }

  useEffect(() => {

    setCanGiveUp(alreadyPlayedThisGame(parseInt(getGameNumber())));
    fetch('/api/get_game', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "gameNumber": getGameNumber()
      })
    })
    .then((res) => {
      return res.json();
    }).then((json) => {
      //console.log(json);
      if (json.game) {
        setGameNumber(json.number);
        return json.game;
      }
      else return "error";
    }).then((mov) => {
      if (mov !== "error") setMovie(mov);
      else return notFound();
    })
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
      <Header finishOpen={setFinishModal} canGiveUp={canGiveUp} setCanGiveUp={setCanGiveUp} setDonation={setDonationModal} setCredits={setCreditsModal} setOldGames={setOldGamesModal} gameNumber={parseInt(getGameNumber())} isOld={true} />
      <DonationModal open={donationModal} setOpen={setDonationModal} pixModal={setPixModal}/>
      <PixModal open={pixModal} setOpen={setPixModal} />
      <CreditsModal open={creditsModal} setOpen={setCreditsModal} />
      <OldGamesModal open={oldGamesModal} setOpen={setOldGamesModal} />
      {movie === null && <Spinner />}
      {movie !== null && gameNumber > 0 &&
      <>
        <FinishModal open={finishModal} setOpen={setFinishModal} answer={movie} setDonation={setDonationModal} gameNumber={gameNumber} />
        <AutocompleteInput word={movie} finishOpen={setFinishModal} setCanGiveUp={setCanGiveUp} gameNumber={gameNumber} oldGame={true} />
      </>
      }
      <Footer setDonation={setDonationModal} />
    </Flex>
  );
};


//export default Home;
