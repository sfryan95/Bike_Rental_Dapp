import { Box, chakra, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue, Icon } from '@chakra-ui/react';
import { useContext } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { BlockchainContext } from '../context/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithdrawForm from './WithdrawForm';

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

export default function OwnerDashboard() {
  const { ownerBalance, balance, owner } = useContext(BlockchainContext);

  return owner ? (
    <>
      <Box maxW="lg" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          Here's your balance:
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'Owner Balance'} stat={ownerBalance} icon={MdOutlineAccountBalanceWallet} bgColor={useColorModeValue('teal.100', 'teal.900')} />
          <StatsCard title={'Contract Balance'} stat={balance} icon={MdOutlineAccountBalanceWallet} bgColor={useColorModeValue('purple.100', 'purple.900')} />
        </SimpleGrid>
        <Flex justifyContent={'center'} alignItems={'center'} mt={10}>
          <WithdrawForm />
        </Flex>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  ) : (
    <>
      <Box maxW="lg" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          Access Denied
        </chakra.h1>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
