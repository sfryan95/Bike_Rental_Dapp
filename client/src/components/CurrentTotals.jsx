import { Box, chakra, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import PayForm from './PayForm';
import AddToBalanceForm from './AddToBalanceForm';
import { BlockchainContext } from '../context/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StatsCard(props) {
  const { title, stat, icon, bgColor } = props;
  return (
    <Stat px={{ base: 4, md: 8 }} py={'5'} shadow={'xl'} rounded={'lg'} backgroundColor={bgColor} color={useColorModeValue('gray.800', 'gray.200')} transition="transform 0.2s" _hover={{ transform: 'scale(1.05)' }}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'3xl'} fontWeight={'bold'}>
            {stat}
          </StatNumber>
        </Box>
        <Icon as={icon} boxSize={'12'} />
      </Flex>
    </Stat>
  );
}

export default function CurrentTotals() {
  const { renterBalance, due, duration, renter } = useContext(BlockchainContext);
  const renterName = renter && renter.length > 0 ? renter[0] : 'Guest';
  const bikeStatus = renter && renter.active ? 'Active' : 'Inactive';
  const bikeStatusColor = renter && renter.active ? 'green.300' : 'red.300';
  const displayDuration = duration >= 60 ? `${Math.floor(duration / 60)}m ${duration % 60}s` : duration + 's';

  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          Welcome {renterName}! Here are your stats:
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'BNB Credit'} stat={renterBalance} icon={MdOutlineAccountBalanceWallet} bgColor={useColorModeValue('teal.100', 'teal.900')} />
          <StatsCard title={'BNB Due'} stat={due} icon={RiMoneyDollarCircleLine} bgColor={useColorModeValue('pink.100', 'pink.900')} />
          <StatsCard title={'Ride Time'} stat={displayDuration} icon={AiOutlineClockCircle} bgColor={useColorModeValue('purple.100', 'purple.900')} />
          <StatsCard title={'Bike Status'} stat={bikeStatus} bgColor={bikeStatusColor} icon={MdOutlineAccountBalanceWallet} />
        </SimpleGrid>
        <Flex justifyContent={'center'} alignItems={'center'} mt={10}>
          <AddToBalanceForm />
          <PayForm />
        </Flex>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
