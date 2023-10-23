import { Flex, Link, Text, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { track } from '@vercel/analytics';

type FooterProps = {
  setDonation: Dispatch<SetStateAction<boolean>>,
}

const Footer = ( props:FooterProps ) => {
  return (
    <Flex as="footer" width="full" justifyContent="center" alignItems='center' display='flex' flexDirection='column' textAlign='center'>
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="https://meu-blog-csamuelsm.vercel.app" isExternal rel="noopener noreferrer">
          samuel santos
        </Link>
      </Text>
      <Button display='block' width='auto' colorScheme='green' variant='outline' rightIcon={<FaHandHoldingHeart />}
          onClick={() => {
              track('Donation');
              props.setDonation(true);
          }}>
          Donate
      </Button>
    </Flex>
  );
};

export default Footer;
