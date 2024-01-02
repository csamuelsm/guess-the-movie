import { Flex, Heading, Text, Grid, GridItem, Button } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { FaHandHoldingHeart } from 'react-icons/fa'

type FooterProps = {
    setDonation: Dispatch<SetStateAction<boolean>>,
}

function DonationRequest(props:FooterProps) {
  return (
    <Flex w='100%' padding={5} borderRadius={10} flexDirection='column' textAlign='left' backgroundColor='green.500'>

        <Grid templateColumns={['repeat(1, 1fr)' ,null, null, 'repeat(4, 1fr)']} gap={6}>

            <GridItem w='100%' textAlign={['center', null, null, 'left']}>
                <Heading size='md' color='white'>
                    I have a request 👋
                </Heading>
            </GridItem>

            <GridItem colSpan={2} color='white' w='100%' textAlign={['center', null, null, 'left']}>
                <Text fontSize='xs'>
                Guess the Movie is a <u><b>free, ad-free game, and I intend to keep it that way</b></u>. However, keeping it running requires time and money. Therefore, if you like the game, I would like to <u><b>ask for your help in donating any amount</b></u> to contribute to the maintenance of Guess the Movie.
                </Text>
            </GridItem>

            <GridItem display='flex' justifyContent='center' w='100%' textAlign='center'>
                <Button display='block' width='auto' colorScheme='red' variant='solid' rightIcon={<FaHandHoldingHeart />}
                    onClick={() => props.setDonation(true)}
                >
                    Donate
                </Button>
            </GridItem>

        </Grid>

    </Flex>
  )
}

export default DonationRequest
