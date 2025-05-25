import { useAccount, useContractRead } from 'wagmi';
import { Card, Text } from '@radix-ui/themes';
import { formatEther } from 'viem';

export function RewardDisplay() {
  const { address } = useAccount();
  const { data: balance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  return (
    <Card>
      <Text>CreatorToken Balance: {balance ? formatEther(balance) : '0'} CTK</Text>
    </Card>
  );
}