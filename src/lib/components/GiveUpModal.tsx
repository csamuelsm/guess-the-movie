import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa';
import { setLastPlayed, increaseNumberOfGames, resetStreak } from '../utils/cookies';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setFinishOpen: Dispatch<SetStateAction<boolean>>,
    setCanGiveUp: Dispatch<SetStateAction<boolean>>
}

function GiveUpModal(props:ModalProps) {

  function giveUp() {
    let today = new Date();
    setLastPlayed(today);
    increaseNumberOfGames();
    resetStreak();
    props.setCanGiveUp(false);
    props.setOpen(false);
    props.setFinishOpen(true);
  }

  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Give up?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    You are almost getting it! Are you sure?
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>
                <Button colorScheme='red' variant='outline' rightIcon={<FaSignOutAlt />}
                    onClick={() => giveUp()}>
                    Give up
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default GiveUpModal;