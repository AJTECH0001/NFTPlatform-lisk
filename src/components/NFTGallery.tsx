import { useContractRead, useContractEvents } from 'wagmi';
import { Card, Text } from '@radix-ui/themes';

export function NFTGallery() {
  const { data: totalMinted } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalMinted',
  });

  const { data: mintEvents } = useContractEvents({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: 'NFTMinted',
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {mintEvents?.map((event) => (
        <Card key={event.args.tokenId}>
          <Text>Token ID: {event.args.tokenId}</Text>
          <Text>Creator: {event.args.creator}</Text>
          <Text>URI: {event.args.tokenURI}</Text>
          {/* Add image rendering logic here */}
        </Card>
      ))}
    </div>
  );
}