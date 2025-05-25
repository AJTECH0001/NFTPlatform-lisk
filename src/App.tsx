import { WagmiProvider } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { WalletConnect, NFTMintForm, NFTGallery, RewardDisplay } from './components';
import { config } from './wagmi';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Theme>
            <div className="container mx-auto p-4">
              <h1 className="text-3xl font-bold mb-4">NFT Platform</h1>
              <WalletConnect />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Mint NFT</h2>
                  <NFTMintForm />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Rewards</h2>
                  <RewardDisplay />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">NFT Gallery</h2>
                <NFTGallery />
              </div>
            </div>
          </Theme>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;