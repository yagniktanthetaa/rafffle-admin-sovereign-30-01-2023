import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../apiInstances/axiosInstance";

const ViewRafffle = () => {
  const [isViewRaffle, setIsViewRaffle] = useState([]);

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const viewRaffle = async () => {
    if (window?.solana) {
      const solana = window?.solana;
      const res = await solana?.connect();

      try {
        const data = {
          wallet_address: res?.publicKey?.toString(),
        };
        axiosInstance
          .post("viewRaffel", data)
          .then((response) => {
            // handle success
            // console.log(response?.data?.data);
            setIsViewRaffle(response?.data?.data);
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

  const deleteRaffle = async (item) => {
    try {
      const data = {
        token_address: item?.token_address,
      };
      axiosInstance
        .post("deleteRaffel", data)
        .then((response) => {
          // handle success
          toast.success(response?.data?.message);
          console.log(response?.data?.message);
          viewRaffle();
          // setIsViewRaffle(response?.data?.data);
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
  };

  return (
    <>
      <div className="my-4 flex justify-center gap-4">
        <button
          className="flex py-3 gap-2 justify-center items-center  bg-gradient-to-t from-indigo-600 to-indigo-500 border border-indigo-500  opacity-90 hover:opacity-100 px-5 mr-3 rounded-xl text-white font-bold transition"
          tabIndex={0}
          type="button"
          onClick={viewRaffle}
          style={{ justifyContent: "space-between", pointerEvents: "auto" }}
        >
          <p>Click to View Raffle</p>
        </button>

        <button
          className="flex py-3 gap-2 justify-center items-center  bg-gradient-to-t from-indigo-600 to-indigo-500 border border-indigo-500  opacity-90 hover:opacity-100 px-12 mr-3 rounded-xl text-white font-bold transition"
          tabIndex={0}
          type="button"
          onClick={() => navigate("/wallet")}
          style={{ justifyContent: "space-between", pointerEvents: "auto" }}
        >
          <p>Go Back</p>
        </button>
      </div>
      {isViewRaffle?.length <= 0 && (
        <div className="text-center my-40 text-5xl font-medium">
          <h1>No NFT</h1>
        </div>
      )}
      <div className="lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 px-8 my-10">
        {isViewRaffle?.map((nft, i) => (
          <div
            className="card rounded-2xl overflow-hidden group md:hover:scale-[1.03] transition border border-purple-700"
            key={i}
          >
            <div className="relative">
              <div className="absolute top-2 right-2 z-40 flex"></div>

              <div className=" aspect-w-1 aspect-h-1 cursor-pointer">
                <img
                  className="h-full object-center object-cover"
                  src={nft?.url}
                  alt={nft?.url}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-offbase transition-all overflow-hidden rounded-b-2xl">
              <div className="flex items-center">
                <h1 className="line-clamp-1 font-bold text-gray-500  hover:text-lime-500 text-sm mr-1 capitalize">
                  {nft?.collection_name}
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
                {nft?.nft_name}
              </h2>

              <div className="flex justify-between gap-x-3 cursor-pointer">
                <div
                  onClick={() => deleteRaffle(nft)}
                  className="from-indigo-600 to-indigo-500 border-indigo-500  block flex-1 text-center py-3 mt-2 bg-gradient-to-t opacity-90 hover:opacity-100 text-white text-xl rounded-2xl border  transition-all"
                >
                  <strong className="block leading-tight">Delete Raffle</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewRafffle;
