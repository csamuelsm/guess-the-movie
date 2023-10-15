import React, { Dispatch, SetStateAction } from 'react'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Link } from '@chakra-ui/react'

type ModalProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

function CreditsModal(props:ModalProps) {
  return (
    <Modal onClose={() => props.setOpen(false)} size='sm' isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                Credits
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text marginY={3}>
                    This game was created by {' '}
                    <Link href='https://meu-blog-csamuelsm.vercel.app/' >
                        Samuel Santos
                    </Link> and was inspired by {' '}
                    <Link href='https://contexto.me/'>
                        Contexto.me
                    </Link>
                    .
                </Text>
                <Text marginY={3}>
                    The base UI is made with Chakra UI with the {' '}
                    <Link href='https://nextarter-chakra.sznm.dev/'>
                        sznm template
                    </Link>.
                </Text>
                <Text marginY={3}>
                    The data used in this game is from MovieLens dataset.
                </Text>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CreditsModal