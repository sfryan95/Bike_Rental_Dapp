import { Button, Box, Image, Text, Stack, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';

const Bike = ({ bike, description, title }) => {
  const { checkOut, checkIn } = useContext(BlockchainContext);
  return (
    <Box boxSize="lg" mx={2}>
      <Image src={bike} mb={10} />
      <Heading as="h3" size="mdsm" mb={4}>
        {title}
      </Heading>
      <Text textAlign="justify">{description}</Text>
      <Stack spacing={0} direction={'row'} align={'center'} justify={'center'} mt={5}>
        <Button
          onClick={checkOut}
          m={2}
          fontSize={'sm'}
          fontWeight={600}
          bg={'teal.500'}
          color={'white'}
          _hover={{
            bg: 'teal.300',
          }}>
          Check Out
        </Button>
        <Button
          onClick={checkIn}
          m={2}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'teal.500'}
          _hover={{
            bg: 'teal.300',
          }}>
          Check In
        </Button>
      </Stack>
    </Box>
  );
};

export default Bike;
