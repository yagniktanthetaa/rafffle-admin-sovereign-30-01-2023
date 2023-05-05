import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apiInstances/axiosInstance";

const WalletNFT = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isSolanaNftData, setIsSolanaNftData] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Connect Phantom Wallet
  const connectWallet = async () => {
    if (window?.solana) {
      const solana = window?.solana;
      const res = await solana?.connect();
      setWalletAddress(res?.publicKey?.toString());
      localStorage.setItem("adminWallet", res?.publicKey?.toString());
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // res?.publicKey?.toString()
        // "FKFKA1MiwZq5B93gHB7f59KqSkVrycB3aToh5mJBh8cv"
        const data = {
          id: 1,
          jsonrpc: "2.0",
          method: "qn_fetchNFTs",
          params: {
            wallet: res?.publicKey?.toString(),
            omitFields: ["provenance", "traits"],
            page: 1,
            perPage: 40,
          },
        };
        axiosInstance
          .post(
            "https://small-chaotic-paper.solana-mainnet.discover.quiknode.pro/e7883b6278111e0164f776d1c4edcbfb7136dd03/",
            data,
            config
          )
          .then((response) => {
            // handle success
            console.log(response?.data?.result?.assets, "solana");
            setIsSolanaNftData(response?.data?.result?.assets);
            setLoading(false);
          })
          .catch((err) => {
            // handle error
            console.error(err);
          });
      } catch (error) {
        // handle error
        console.error(error);
      }
    } else {
      // alert("Phantom Wallet not found");
      window.open("https://phantom.app/");
    }
  };

  const clickToNavigate = (data) => {
    localStorage.setItem("nftDetails", JSON.stringify(data));
    navigate("/create");
  };

  const viewRaffle = () => {
    navigate("/view");
  };

  return (
    <>
      <div className="my-4 flex justify-center gap-4">
        <button
          className="flex py-2 gap-2 justify-center items-center  bg-gradient-to-t from-indigo-600 to-indigo-500 border border-indigo-500  opacity-90 hover:opacity-100 px-5 mr-3 rounded-xl text-white font-bold transition"
          tabIndex={0}
          type="button"
          onClick={connectWallet}
          style={{ justifyContent: "space-between", pointerEvents: "auto" }}
        >
          <i className="">
            <img
              src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K"
              alt="Phantom icon"
            />
          </i>
          {!walletAddress ? (
            <p>Connect Wallet</p>
          ) : (
            <p>
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </p>
          )}
        </button>

        <button
          className="flex py-2 gap-2 justify-center items-center  bg-gradient-to-t from-indigo-600 to-indigo-500 border border-indigo-500  opacity-90 hover:opacity-100 px-12 mr-3 rounded-xl text-white font-bold transition"
          tabIndex={0}
          type="button"
          onClick={viewRaffle}
          style={{ justifyContent: "space-between", pointerEvents: "auto" }}
        >
          <p>View Raffle</p>
        </button>
      </div>
      {isSolanaNftData.length <= 0 && (
        <div className="text-center my-40 text-5xl font-medium">
          <h1>No NFT</h1>
        </div>
      )}
      <div className="lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 px-8 my-10">
        {isSolanaNftData?.map((nft, i) => (
          <div
            className="card rounded-2xl overflow-hidden group md:hover:scale-[1.03] transition border border-purple-700"
            key={i}
          >
            <div className="relative">
              <div className="absolute top-2 right-2 z-40 flex"></div>

              <div className=" aspect-w-1 aspect-h-1 cursor-pointer">
                <img
                  className="h-full object-center object-cover"
                  src={nft?.imageUrl}
                  alt={nft?.imageUrl}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-offbase transition-all overflow-hidden rounded-b-2xl">
              <div className="flex items-center">
                <h1 className="line-clamp-1 font-bold text-gray-500  hover:text-lime-500 text-sm mr-1 capitalize">
                  {nft?.collectionName}
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 fill-current text-lime-500"
                >
                  <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                </svg>
              </div>
              <h2 className="text-left line-clamp-1 font-bold text-xl ">
                {nft?.name}
              </h2>

              <div className="flex justify-between gap-x-3 cursor-pointer">
                <div
                  onClick={() => clickToNavigate(nft)}
                  className="from-indigo-600 to-indigo-500 border-indigo-500  block flex-1 text-center py-3 mt-2 bg-gradient-to-t opacity-90 hover:opacity-100 text-white text-xl rounded-2xl border  transition-all"
                >
                  <strong className="block leading-tight">Create Raffle</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WalletNFT;
