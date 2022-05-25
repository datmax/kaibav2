function LimitSwap({ input, output }) {
  return (
    <div className="grid grid-cols-1 gap-y-4 px-4 py-2">
      <div>
        <p className="w-full">Price({input.symbol})</p>
      </div>
      <div className="-mt-2 flex flex-row items-center rounded-lg bg-shadeblack  px-2">
        <input
          type="number"
          className=" basis-3/5 bg-transparent py-2 font-thin active:outline-none active:ring-0 "
          placeholder={input.symbol + ' price'}
        />
        <div className="mr-2 basis-2/5 text-right opacity-50">$380</div>
      </div>
      <div className="px-2">
        <p>Amount({output.symbol})</p>
      </div>
      <input
        type="number"
        className=" -mt-2 rounded-lg bg-shadeblack px-2  py-4 font-thin active:outline-none active:ring-0"
        placeholder="enter an amount."
      />
      <p className="px-2">Total({input.symbol})</p>

      <input
        type="number"
        className="-mt-2 bg-shadeblack px-2 py-4 font-thin active:outline-none active:ring-0"
        placeholder="Total"
      />
      <input
        type="range"
        min="0"
        max="100"
        className="mx-2 -mt-1 h-0.5 appearance-none rounded-lg bg-white outline-none focus:bg-white focus:ring-0"
      />
      <div className="mx-2 -mt-1 flex justify-between font-thin opacity-50">
        <p className="text-left">0</p>
        <p className="text-right">max</p>
      </div>
      <p className="-mt-4 px-2 opacity-50">Available balance: 3 ETH</p>
      <p className="-mt-4 px-2 opacity-80">50$ saved </p>
      <motion.button
        whileHover={{
          backgroundColor: '#08D4B0',
          transition: { duration: 0.3 },
        }}
        className="rounded-lg bg-white px-2 py-2 text-center text-xl font-thin text-black"
      >
        swap
      </motion.button>
    </div>
  )
}

export default LimitSwap
