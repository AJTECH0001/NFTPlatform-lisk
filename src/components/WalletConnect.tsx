import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <ConnectKitButton />
      {isConnected && (
        <div className="mt-2">
          <p>Address: {address}</p>
          <p>Balance: {balance ? formatEther(balance.value) : '0'} ETH</p>
        </div>
      )}
    </div>
  );
}