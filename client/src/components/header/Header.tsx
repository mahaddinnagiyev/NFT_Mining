import { useAccount } from "wagmi";
import "./header.css";

const Header = () => {
  const {address} =useAccount();

  localStorage.setItem("userWalletAddress", address);
  
  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="logo">NFTopia</div>
          <w3m-button />
        </nav>
      </header>
    </>
  );
};

export default Header;
