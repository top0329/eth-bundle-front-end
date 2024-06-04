import React from 'react';

function CreateNewTokenPage() {
  return (
    <div className="relative mx-40">
      <h1 className="text-5xl text-center font-bold mt-20">Create New Token</h1>
      <div className="flex flex-row justify-between items-center mt-20 text-3xl gap-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Token Name</label>
          <input className="bg-gray-400 rounded-xl px-4 py-2 w-80" />
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Token Symbol</label>
          <input className="bg-gray-400 rounded-xl px-4 py-2 w-80" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-20 text-3xl gap-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Total Supply</label>
          <input className="bg-gray-400 rounded-xl px-4 py-2 w-80" />
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <label className="truncate">Decimal</label>
          <input className="bg-gray-400 rounded-xl px-4 py-2 w-80" />
        </div>
      </div>
      <button className='absolute right-0 bg-gray-500 px-8 py-3 rounded-2xl text-4xl mt-20'>Create</button>
    </div>
  );
}

export default CreateNewTokenPage;
