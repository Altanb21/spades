import React, { useState } from "react";
import { CgClose, CgCheck } from "react-icons/cg";

const TowerLegendBet = ({ betting, sendMyBet, bet, setBet }) => {
  const [slider, setSlider] = useState(false);

  return (
    <div className='flex flex-col justify-top items-center h-full gap-8 py-10'>
      <div>
        <span className='text-white opacity-80 ml-4'>Amount:</span>
        <div className='relative w-72 mt-0.5 mb-0.5'>
          <input
            disabled={betting}
            type='number'
            className={`bg-slate-800 p-2 rounded-full w-full pl-4 font-semibold disabled:opacity-75`}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            onMouseOut={(e) => {
              if (e.target.value === "" || e.target.value < 1) setBet(1);
              if (e.target.value > 2000) setBet(2000);
            }}
          />
          <div className='flex gap-0.5 child:bg-slate-600 absolute right-0 top-0 bottom-0 child:px-4 py-0.5 pr-0.5 child:font-semibold'>
            <button
              disabled={betting}
              className='rounded-l-full'
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 200 || prevValue * 2 > 200 ? 200 : prevValue * 2
                );
              }}
            >
              x2
            </button>
            <button
              disabled={betting}
              onClick={() => {
                setBet((prevValue) =>
                  prevValue === 100 || prevValue / 2 < 100 ? 100 : prevValue / 2
                );
              }}
            >
              /2
            </button>
            <button
              disabled={betting}
              className='rounded-r-full'
              onClick={() => setSlider((prev) => !prev)}
            >
              R
            </button>
          </div>
        </div>
        <span className='text-white opacity-80 ml-4'>Bet range: 100 - 200</span>
        <div
          className={`flex items-center gap-1.5 ml-4 ${
            slider ? "visible" : "hidden"
          }`}
        >
          <span>Min</span>
          <input
            disabled={betting}
            type='range'
            style={{ transform: "translateY(1px)" }}
            min={100}
            max={200}
            value={bet}
            onChange={(e) => setBet(e.target.value)}
          />
          <span>Max</span>
        </div>
      </div>
      <div>
        <span className='flex gap-2 font-semibold opacity-80 text-lg'>
          Type:
          <div className='flex justify-center items-center border-2 border-white p-1.5 rounded'>
            <CgClose color='red' size='14px' />
          </div>
          <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
            <CgCheck color='#4ade80' size='20px' />
          </div>
          <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
            <CgCheck color='#4ade80' size='20px' />
          </div>
          <div className='flex justify-center items-center border-2 border-white p-0.5 rounded'>
            <CgCheck color='#4ade80' size='20px' />
          </div>
        </span>
      </div>
      <button
        className='bg-orange-500 py-2 px-5 rounded-full text-lg py-4 font-semibold w-72'
        onClick={() => sendMyBet()}
      >
        {betting ? "Cash Out" : "Bet"}
      </button>
    </div>
  );
};

export default TowerLegendBet;
