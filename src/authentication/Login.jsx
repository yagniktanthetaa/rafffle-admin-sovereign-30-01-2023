import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = fields;
    if (email === "admin@gmail.com" && password === "admin@123")
      toast.success("Login Success...");
    return navigate("/wallet");
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

  const OuterBox =
    "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";
  return (
    <>
      <section className="container mx-auto px-5 h-screen">
        <div className="h-full grid place-items-center">
          <div
            className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
          >
            <form onSubmit={handleSubmit} className="max-w-md mt-14">
              {/* ---- Email input ---- */}

              <input
                type="email"
                className={`${InputBox}`}
                placeholder="Email"
                name="email"
                value={fields?.email}
                onChange={onChangeInput}
              />

              {/* ---- Password input ---- */}

              <input
                type="password"
                className={`${InputBox}`}
                placeholder="Password"
                name="password"
                value={fields?.password}
                onChange={onChangeInput}
              />

              {/* ---- Submit button ---- */}

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="my-5 py-3 px-8 rounded-lg bg-[#000000] hover:bg-[#231F20] text-white text-sm md:text-base font-medium"
                  // onClick={handleSubmit}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
