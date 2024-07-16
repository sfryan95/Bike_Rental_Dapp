import CurrentTotals from './CurrentTotals';
import { Stack, Box, Flex, Center } from '@chakra-ui/react';
import Bike from './Bike';
import Bike1 from '../assets/bike1.jpeg';
import Bike2 from '../assets/bike2.jpeg';
import Bike3 from '../assets/bike3.jpeg';
import RenterForm from './RenterForm';
import { useContext, useState } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';
import ClipLoader from 'react-spinners/ClipLoader';

const Dashboard = () => {
  const { renterExists, currentAccount } = useContext(BlockchainContext);
  let [loading, setLoading] = useState(true);

  const bike1Title = 'Explore the City in Style with Our Standard Electric Bike!';
  const bike1Description = `
    Experience the perfect blend of elegance and performance with our stylish white electric bike. Designed for city commuting and urban adventures, this bike features a robust frame and a powerful motor, ensuring a smooth and efficient ride. Its ergonomic design and comfortable saddle make it ideal for longer rides, while the advanced braking system ensures safety in all conditions.
`;

  const bike2Title = 'Go Off Road with Our All-Terrain Electric Bike!';
  const bike2Description = `
    Get ready for adventure with our rugged black electric bike, built to tackle any terrain with ease. This bike boasts a sturdy frame, wide tires for better grip, and a powerful electric motor to help you conquer hills and trails. Its sleek, modern design combined with top-notch components makes it perfect for both urban commuting and off-road escapades. Ride with confidence and style wherever you go.
`;

  const bike3Title = 'Ride into the Future with Our Premium Electric Bike!';
  const bike3Description = `
    Step into the future of cycling with our minimalist black electric bike. Featuring a unique, modern design, this bike is perfect for the tech-savvy rider. Its lightweight frame, efficient electric motor, and streamlined look make it an excellent choice for navigating city streets with ease. Enjoy the perfect combination of functionality and cutting-edge style on your daily commute or weekend rides.
`;

  return (
    <Stack as={Box} textAlign={'center'} spacing={{ base: 6, md: 12 }} py={{ base: 8, md: 16 }}>
      {renterExists == null && currentAccount ? (
        <Center>
          <ClipLoader loading={loading} size={75} />
        </Center>
      ) : renterExists ? (
        <CurrentTotals />
      ) : (
        <RenterForm />
      )}
      <Flex justifyContent={'center'} alignItems={'center'} px={3}>
        <Bike bike={Bike1} title={bike1Title} description={bike1Description} />
        <Bike bike={Bike2} title={bike2Title} description={bike2Description} />
        <Bike bike={Bike3} title={bike3Title} description={bike3Description} />
      </Flex>
    </Stack>
  );
};

export default Dashboard;
