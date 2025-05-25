import PinataSDK from '@pinata/sdk';

const pinata = new PinataSDK({
  pinataApiKey: PINATA_API_KEY,
  pinataSecretApiKey: PINATA_API_SECRET,
});

export async function uploadToIPFS(file: File, metadata: any) {
  try {
    // Upload image
    const imageResponse = await pinata.pinFileToIPFS(file);
    const imageUrl = `ipfs://${imageResponse.IpfsHash}`;

    // Upload metadata
    const metadataResponse = await pinata.pinJSONToIPFS({
      ...metadata,
      image: imageUrl,
    });

    return `ipfs://${metadataResponse.IpfsHash}`;
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw error;
  }
}