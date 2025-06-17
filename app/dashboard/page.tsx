import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="bg-white/10 rounded-2xl px-8 py-10 shadow-lg text-center backdrop-blur-md">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_48dp.png"
          alt="Gmail Logo"
          width={64}
          height={64}
          className="mx-auto mb-6"
        />
        <h1 className="mb-3 font-bold text-3xl drop-shadow">
          Gmail Connected!
        </h1>
        <p className="text-lg mb-0">
          Your Gmail account has been successfully linked.
          <br />
          You can now access your emails and more.
        </p>
      </div>
    </div>
  );
};

export default page;
