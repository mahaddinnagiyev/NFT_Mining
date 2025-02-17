import { StoreNftDTO } from "./dto/nst.dto";

export const storeNewNft = async (body: StoreNftDTO) => {
  const response = await fetch("${process.env.BACKEND_URL}/nft/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

export const getNftByUserWalletAddress = async (
  userWalletAddress: string
): Promise<{
  success: boolean;
  statusCode: number;
  data: {
    id: string;
    nftName: string;
    nftID: number;
    nftDescription: string;
    nftLogoUrl: string;
    userWalletAddress: string;
  }[];
  error?: string;
  message?: string;
  response: {
    success: boolean;
    error?: string;
    message?: string;
  }
}> => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/nft/gallery/${userWalletAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
