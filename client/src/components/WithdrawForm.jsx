import { useForm } from 'react-hook-form';
import { Text, Button, Center, Box, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { BlockchainContext } from '../context/BlockchainContext';

export default function WithdrawForm() {
  const { ownerWithdraw } = useContext(BlockchainContext);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await ownerWithdraw();
  };

  return (
    <VStack spacing={4} mt={7}>
      <Text fontFamily={'heading'} fontSize={'x-large'} fontWeight={600}>
        Withdraw your earnings.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Withdraw
          </Button>
        </Center>
      </form>
    </VStack>
  );
}
