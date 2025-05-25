import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { uploadToIPFS } from '../utils/ipfs';
import { Button, Input, Label } from '@radix-ui/themes';

export function NFTMintForm() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { write, isLoading, data } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mintNFT',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const tokenURI = await uploadToIPFS(file, { name, description });
      write({ args: [tokenURI] });
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>Image</Label>
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </Button>
      {data && <p>Transaction Hash: {data.hash}</p>}
    </form>
  );
}