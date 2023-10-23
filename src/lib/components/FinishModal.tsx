import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent,
        ModalHeader, ModalCloseButton, ModalBody,
        ModalFooter, Button, Accordion, AccordionButton, AccordionIcon,
        AccordionPanel, AccordionItem, Box, Grid, GridItem, Heading, Divider } from '@chakra-ui/react'
import { FaHandHoldingHeart, FaShareAlt } from 'react-icons/fa';
import { getLastPlayed, getNumberOfGames, getNumberOfVictories, getVictoriesPercentage, getStreak } from '../utils/cookies';
import CountDown from './CountDown';
import { RWebShare } from "react-web-share";
import { track } from '@vercel/analytics';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    answer: string,
    setDonation: Dispatch<SetStateAction<boolean>>,
    gameNumber: number,
    blue:number,
    green:number,
    yellow:number,
    red:number
}

function FinishModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Game {'#'}{props.gameNumber} finished!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                <Text marginY={3}>Another game will be available tomorrow!</Text>

                <Divider />

                {/*<Text marginY={3}>
                    Games played: {getNumberOfGames()} <br/>
                    Nº of victories: {getNumberOfVictories()} <br/>
                    Percentage of victories: {getVictoriesPercentage()}
                </Text>*/}

                <Grid templateColumns='repeat(2, 1fr)' gap={6} marginY={4}>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Games played</Text>
                        <Heading size='md'>
                            {getNumberOfGames()}
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Victories</Text>
                        <Heading size='md'>
                            {getNumberOfVictories()}
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Percentage of victories</Text>
                        <Heading size='md'>
                            {getVictoriesPercentage()} %
                        </Heading>
                    </GridItem>

                    <GridItem w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Streak</Text>
                        <Heading size='md'>
                            {getStreak()}
                        </Heading>
                    </GridItem>

                    <GridItem colSpan={2} w='100%' textAlign='center' display='flex' flexDirection='column'>
                        <Text fontSize='xs'>Next game in</Text>
                        <CountDown />
                    </GridItem>
                </Grid>

                <Accordion allowToggle marginY={3}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    Reveal answer
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text><b>{props.answer}</b></Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                {/*<Divider />*/}

                <Text marginY={3} fontSize="sm">
                    If you liked this game, please consider donating any value.
                </Text>
            </ModalBody>
            <ModalFooter>
                <RWebShare
                    data={{
                        text: encodeURIComponent(`🎥 GuessTheMovie #${props.gameNumber}\n\n🔵 ${props.blue}\n🟢 ${props.green}\n🟡 ${props.yellow}\n🔴 ${props.red}\n\n🏆 My current Streak: ${getStreak()}\n🎉 I guessed the movie in ${getVictoriesPercentage()}% of my games!\n\n`),
                        url: window.location.href,
                        title: "GuessTheMovie",
                    }}
                    disableNative={true}
                    onClick={() => {
                        track('Share');
                    }}
                >
                <Button marginX={2} rightIcon={<FaShareAlt />}>
                    Share
                </Button>
                </RWebShare>
                <Button colorScheme='green' variant='outline' rightIcon={<FaHandHoldingHeart />}
                    onClick={() => {
                        track('Donation');
                        props.setDonation(true);
                    }}
                    >
                    Donate
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default FinishModal