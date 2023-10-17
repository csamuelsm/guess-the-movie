import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaGithubAlt, FaCoffee, FaPaypal } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    pixModal: Dispatch<SetStateAction<boolean>>,
}

function DonationModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Donate
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    You can donate any value to support this game. Choose the best option for you:
                </Text>
                <Flex flexDirection="column" gap={2} marginY={3}>
                    <Link href='https://github.com/sponsors/csamuelsm' isExternal>
                        <Button w='100%' leftIcon={<FaGithubAlt/>} variant='outline' colorScheme='gray'>
                            Github Sponsors
                        </Button>
                    </Link>
                    <Link href='https://www.buymeacoffee.com/csamuelssm' isExternal>
                        <Button w='100%' leftIcon={<FaCoffee/>} variant='outline' colorScheme='orange'>
                            Buy me a Coffee
                        </Button>
                    </Link>
                    <Button w='100%' leftIcon={<FaPix/>} variant='outline' colorScheme='green'
                    onClick={() => {
                        props.pixModal(true);
                    }}>
                        Pix
                    </Button>
                    <Button w='100%' leftIcon={<FaPaypal/>} variant='outline' colorScheme='blue'
                        onClick={() => {
                            props.pixModal(true);
                        }}>
                        PayPal
                    </Button>
                </Flex>
            </ModalBody>
            {/*<ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>
            </ModalFooter>*/}
        </ModalContent>
    </Modal>
  )
}

export default DonationModal