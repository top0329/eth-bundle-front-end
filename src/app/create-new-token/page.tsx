'use client';

import React, { useState } from 'react';

import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import useToast from '@/hooks/useToast';

function CreateNewTokenPage() {
  const { tokenFactoryContract, account, isConnected, library } = useWeb3();
  const { showToast } = useToast();
  const { openSpin, closeSpin } = useSpinner();

  const [tokenValue, setTokenValue] = useState<any>({
    tokenName: '',
    tokenSymbol: '',
    totalSupply: 0,
    decimal: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTokenValue({ ...tokenValue, [name]: value });
  };

  const handleTokenCreate = async () => {
    try {
      if (isConnected && library) {
        openSpin('Creating new token');
        const tx = await tokenFactoryContract.methods
          .createToken(
            tokenValue.tokenName,
            tokenValue.tokenSymbol,
            tokenValue.decimal,
            tokenValue.totalSupply
          )
          .send({ from: account });
      } else showToast('warning', 'Please connect wallet!');
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <div className="relative mx-40">
      <h1 className="text-5xl text-center font-bold mt-20">Create New Token</h1>
      <div className="flex flex-row justify-between items-center mt-20 text-3xl gap-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Token Name</label>
          <input
            id="token-name"
            name="tokenName"
            className="bg-gray-400 rounded-xl px-4 py-2 w-80"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Token Symbol</label>
          <input
            id="token-symbol"
            name="tokenSymbol"
            className="bg-gray-400 rounded-xl px-4 py-2 w-80"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-20 text-3xl gap-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Total Supply</label>
          <input
            id="total-supply"
            name="totalSupply"
            className="bg-gray-400 rounded-xl px-4 py-2 w-80"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Decimal</label>
          <input
            id="decimal"
            name="decimal"
            className="bg-gray-400 rounded-xl px-4 py-2 w-80"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        className="absolute right-0 bg-gray-500 px-8 py-3 rounded-2xl text-4xl mt-20"
        onClick={handleTokenCreate}
      >
        Create
      </button>
    </div>
  );
}

export default CreateNewTokenPage;
