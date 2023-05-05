import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../apiInstances/axiosInstance";

const CreateRafffle = () => {
  const [isTicketPrice, setIsTicketPrice] = useState("");
  const [isTicketSupply, setIsTicketSupply] = useState("");
  const [currency, setCurrency] = useState("SOL");
  const [isDate, setIsDate] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [isWallet, setIsWallet] = useState(localStorage.getItem("adminWallet"));

  // eslint-disable-next-line
  const [userProfile, setuserProfile] = useState(
    JSON.parse(localStorage.getItem("nftDetails")) || {}
  );

  const handleTicketPriceChange = (e) => {
    setIsTicketPrice(e.target.value);
  };

  const handleTicketChange = (e) => {
    setIsTicketSupply(e.target.value);
  };

  const handleDateChange = (e) => {
    setIsDate(e.target.value);
  };

  const changeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  //   Create Raffle
  const createRaffle = () => {
    // wallet_address, collection_name, nft_name, token_address, raffel_end_date, url, ticket_supply, ticket_price
    const data = {
      wallet_address: isWallet,
      collection_name: userProfile.collectionName,
      nft_name: userProfile.name,
      token_address: userProfile.tokenAddress,
      url: userProfile.imageUrl,
      raffel_end_date: isDate,
      ticket_supply: isTicketSupply,
      ticket_price: isTicketPrice,
      currency: currency,
    };
    axiosInstance
      .post(`addRaffel`, data)
      .then((response) => {
        // handle success
        console.log(response.data);

        toast.success(response?.data?.message);
        navigate("/wallet");

        // toast.error(response?.data?.message);
      })
      .catch((err) => {
        // handle error
        console.log(err?.message);
      });
  };

  return (
    <>
      <div className="pt-[75px] min-h-screen">
        <div className="max-w-screen-xl mx-auto md:px-8 md:py-4">
          <h1 className="text-5xl font-bold px-8 md:px-0 mt-3 sm:mb-8 text-purple-500/30">
            CREATE NEW RAFFLE
          </h1>
          <div className="w-full flex  lg:flex-row">
            <div className=" lg:w-1/3 md:mr-8 px-8 pt-5 md:pt-0 md:px-0 self-start">
              <div className="flex flex-col p-8 sm:py-16 justify-center items-center h-full rounded-2xl overflow-hidden mb-8  text-white dark:text-purple-400/70 border-4 border-purple-500 dark:border-primary hover:border-primary bg-offbase cursor-pointer group">
                <img
                  src={userProfile.imageUrl}
                  alt={userProfile.imageUrl}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="lg:w-2/3 bg-white dark:bg-offbase md:rounded-2xl p-8 mt-5 md:mt-0 transition">
              <div className="flex  lg:flex-row">
                <div className="lg:w-2/5 mb-3 lg:mb-0 lg:mr-4">
                  <strong className="block pl-3 text-sm text-gray-600 dark:text-purple-400/70">
                    Raffle End Date
                  </strong>
                  <div className="relative">
                    <input
                      className="border-2 w-full border-primary focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none  bg-lightbase dark:bg-transparent p-3 rounded-2xl text-primary font-bold text-xl"
                      type="datetime-local"
                      name="enddate"
                      id="enddate"
                      value={isDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div className="lg:w-1/5 mb-3 lg:mb-0 lg:mr-4">
                  <strong className="block pl-3 text-sm text-gray-600 dark:text-purple-400/70">
                    Ticket Supply
                  </strong>
                  <div className="">
                    <input
                      className="border-2 w-full border-primary focus:border-purple-500 dark:focus:border-purple-500  focus:outline-none bg-lightbase dark:bg-transparent p-3 rounded-2xl text-center text-primary font-bold text-xl appearance-none"
                      min={50}
                      max={5000}
                      type="number"
                      name="supply"
                      id="supply"
                      value={isTicketSupply}
                      onChange={handleTicketChange}
                    />
                  </div>
                </div>
                <div className="lg:w-2/5 mb-3 lg:mb-0 flex">
                  <div>
                    <strong className="block pl-3 text-sm text-gray-600 dark:text-purple-400/70">
                      Ticket Price
                    </strong>
                    <div className=" flex">
                      <input
                        className="border-2 w-full border-primary focus:border-purple-500 dark:focus:border-purple-500  focus:outline-none bg-lightbase dark:bg-transparent p-3 rounded-tl-2xl rounded-bl-2xl text-primary font-bold text-xl"
                        type="number"
                        name="price"
                        id="price"
                        value={isTicketPrice}
                        onChange={handleTicketPriceChange}
                      />

                      <select
                        value={currency}
                        onChange={changeCurrency}
                        className="-ml-1 border-2 w-full border-primary focus:border-purple-500 dark:focus:border-purple-500 3 focus:outline-none bg-lightbase dark:bg-transparent p-3 rounded-tr-2xl rounded-br-2xl text-primary font-bold text-xl"
                      >
                        <option value="SOL">SOL</option>
                        <option value="SQRE">SQRE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  lg:flex-row mt-4 justify-between items-center">
                <div className="">
                  <label className="cursor-pointer">
                    <input
                      className=""
                      type="checkbox"
                      name="agree"
                      checked
                      readOnly
                    />
                    <span className="ml-3 font-bold text-gray-600 dark:text-purple-500 hover:text-primary">
                      I accept the terms &amp; conditions below.
                    </span>
                  </label>
                </div>
                <div className=" lg:w-auto mt-4 lg:mt-0">
                  <button
                    onClick={createRaffle}
                    className="h-[60px] w-full lg:w-auto px-8 md:py-0 bg-gradient-to-t from-lime-600 to-lime-400 border border-lime-500  opacity-90 hover:opacity-100 rounded-xl text-white text-xl font-bold transition"
                  >
                    Create Raffle
                  </button>
                </div>
              </div>
              <div className="p-5 mt-8 border border-purple-200 rounded-xl bg-purple-100 dark:border-purple-800 dark:bg-purple-800/10">
                <h3 className="font-bold text-purple-600">
                  Terms &amp; Conditions
                </h3>
                <ol className="list-decimal ml-5 dark:text-white">
                  <li>
                    When you create a raffle, the NFT prize you have chosen will
                    be transferred from your wallet into our escrow.
                  </li>
                  <li>
                    An up-front rent fee, charged in SOL will be taken in
                    proportion to number of tickets. This will be auto refunded
                    after the raffle concludes.
                  </li>
                  <li>
                    Raffles will proceed regardless if all tickets are sold or
                    not.
                  </li>
                  <li>
                    The creator can end the raffle after the specified date and
                    time.
                  </li>
                  <li>The raffle should run for a minimum of 24 hours.</li>
                  <li>
                    Rafffle will take a 5% commission fee from the ticket sales.
                  </li>
                  <li>
                    FFF and TFF holders will get a 50% fee waiver for staking
                    them while creating the raffle.
                  </li>
                  <li>
                    Additionally, they get to be on "Featured" section of the
                    home page.
                  </li>
                  <li>Your NFT will be returned if there's no ticket sales.</li>
                  <li>
                    Raffles <strong>CANNOT</strong> be edited or cancelled once
                    a ticket is sold.
                  </li>
                  <li>
                    Rafffle does not take responsibility for promoting or
                    marketing the raffles.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRafffle;
