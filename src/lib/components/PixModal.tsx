import React, { Dispatch, SetStateAction } from 'react'
import { Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function PixModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Make a Pix
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    You can scan this QR Code to make a Pix to Cicero Samuel Santos Morais.
                </Text>
                <Flex w='100%' textAlign='center' alignItems='center' flexDirection='column'>
                    <Image src='qr-code-pix.png' alt='qr-code pix' marginY={3} />
                </Flex>
                <Text>
                    Or you can use the key: <b>9860c0ad-1cfe-4b59-9d76-1a43a4e3461e</b>
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button marginX={2} onClick={() => {
                    props.setOpen(false);
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default PixModal