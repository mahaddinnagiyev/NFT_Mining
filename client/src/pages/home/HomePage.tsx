import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../../App.css";
import { EthereumProvider } from "@metamask/providers";
import {
  getNftByUserWalletAddress,
  storeNewNft,
} from "../../services/nft/nft.service";

const HomePage = () => {
  const [formData, setFormData] = useState({
    nftID: Math.floor(Math.random() * 1000000000),
    nftName: "",
    nftDescription: "",
    nftImageUrl: "",
    userWalletAddress: "",
  });

  const [nftGallery, setNftGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(true);
  const [formSubmited, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    nftLogoUrl: "",
    nftName: "",
    nftDescription: "",
    nftID: 0,
  });

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const initialAccounts = await (
            window.ethereum as EthereumProvider
          ).request({
            method: "eth_accounts",
          });

          if (initialAccounts.length > 0) {
            const userWallet = initialAccounts[0];
            updateWalletState(userWallet);
            return;
          }

          const accounts = await (window.ethereum as EthereumProvider).request({
            method: "eth_requestAccounts",
          });

          if (accounts.length > 0) {
            const userWallet = accounts[0];
            updateWalletState(userWallet);
          }
        } catch (error) {
          console.error("Error fetching wallet address:", error);
        } finally {
          setWalletLoading(false);
        }
      } else {
        setWalletLoading(false);
        console.error("Ethereum wallet not detected");
      }
    };

    const updateWalletState = (userWallet: string) => {
      localStorage.setItem("userWalletAddress", userWallet);
      setFormData((prev) => ({
        ...prev,
        userWalletAddress: userWallet,
      }));
      fetchNftGallery(userWallet);
    };

    const storedWalletAddress = localStorage.getItem("userWalletAddress");
    if (storedWalletAddress) {
      updateWalletState(storedWalletAddress);
    } else {
      getWalletAddress();
    }
  }, []);

  const fetchNftGallery = async (walletAddress: string) => {
    try {
      const nfts = await getNftByUserWalletAddress(walletAddress);
      if (nfts.success) {
        setNftGallery(nfts.data);
      } else {
        console.error("Error fetching NFT gallery:", nfts.error);
      }
    } catch (error) {
      console.error("Error fetching NFT gallery:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await storeNewNft({
        nftID: formData.nftID,
        nftDescription: formData.nftDescription,
        nftName: formData.nftName,
        nftLogoUrl: formData.nftImageUrl,
        userWalletAddress: localStorage.getItem("userWalletAddress") || "",
      });

      if (response.success) {
        alert("NFT stored successfully");
        setNftGallery((prev) => [...prev, response.data]);
        setIsFormSubmitted(true);
        setSubmittedData({
          nftLogoUrl: formData.nftImageUrl,
          nftName: formData.nftName,
          nftDescription: formData.nftDescription,
          nftID: formData.nftID,
        });
      } else {
        alert(response.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error storing NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover & Collect
              <span className="gradient-text"> Extraordinary NFTs</span>
            </h1>
            <p className="hero-description">
              Enter the world of digital art and collectibles. Explore unique
              NFTs created by artists worldwide.
            </p>
            <div className="hero-btns">
              <button className="cta-button">
                <RocketLaunchIcon /> Start Creating
              </button>
              <button className="hero-btn-2">
                <PlayCircleOutlineIcon /> Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Mint Your NFT Form */}
        <section className="mint-section">
          {formSubmited ? (
            <form className="mint-form border-2 border-green-500">
              <h2 className="section-title font-bold text-xl">
                NFT Mint Successfull
              </h2>
              <div className="form-group mt-7">
                <img src={submittedData.nftLogoUrl} alt="" className="w-full" />
              </div>
              <div className="form-group">
                <label htmlFor="nftDescription">NFT Name</label>
                <input
                  type="text"
                  id="nftDescription"
                  name="nftDescription"
                  value={submittedData.nftName}
                  required
                  className="min-h-[100px]"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="nftDescription">Description</label>
                <input
                  type="text"
                  id="nftDescription"
                  name="nftDescription"
                  value={submittedData.nftDescription}
                  required
                  className="min-h-[100px]"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="nftDescription">NFT ID</label>
                <input
                  type="text"
                  id="nftDescription"
                  name="nftDescription"
                  value={`#${submittedData.nftID}`}
                  required
                  readOnly
                />
              </div>
            </form>
          ) : (
            <form className="mint-form" onSubmit={handleSubmit}>
              <h2 className="section-title font-bold text-xl">Mint Your NFT</h2>
              <div className="form-group mt-7">
                <label htmlFor="nftName">NFT Name</label>
                <input
                  type="text"
                  id="nftName"
                  name="nftName"
                  placeholder="Enter NFT Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nftDescription">Description</label>
                <input
                  type="text"
                  id="nftDescription"
                  name="nftDescription"
                  placeholder="Describe your NFT"
                  required
                  className="min-h-[100px]"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nftImageUrl">Image URL</label>
                <input
                  type="text"
                  id="nftImageUrl"
                  name="nftImageUrl"
                  placeholder="Enter Image URL"
                  required
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="mint-button" disabled={loading}>
                {loading ? "Minting..." : "Mint NFT"}
              </button>
            </form>
          )}
        </section>

        {/* Your NFT Gallery */}
        <section className="collections-section">
          <h2 className="section-title font-bold text-xl">Your NFT Gallery</h2>
          <div className="nft-grid">
            {nftGallery.length > 0 ? (
              nftGallery.map((nft, index) => (
                <div key={index} className="nft-card">
                  <img
                    src={
                      nft.nftLogoUrl || "https://via.placeholder.com/300x250"
                    }
                    alt={nft.nftName}
                    className="nft-image"
                    width={300}
                    height={250}
                  />
                  <h3 className="nft-title">{nft.nftName}</h3>
                  <p className="nft-description">{nft.nftDescription}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No NFTs found for your wallet.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
