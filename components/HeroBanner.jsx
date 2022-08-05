import React from 'react'
import { useRouter } from 'next/router'
import Typewriter from 'typewriter-effect'

function HeroBanner() {
  const router = useRouter()
  return (
    <div
      className="bg-[url('https://images.pexels.com/photos/9486900/pexels-photo-9486900.jpeg?auto=compress&cs=tinysrgb&w=600')] flex h-4/5 w-full 
     md:max-w-[80%] bg-[#dcdcdc] rounded-lg  py-2 px-2 leading-3 bg-cover bg-center"
    >
      <div className="flex-1 text-xs md:text-2xl  pl-8 py-12 w-full mt-12 text-white leading-8 overflow-hidden">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                ' An effort made for the happiness of others lifts us above ourselves..',
              )
              .pauseFor(2000)
              .start()
              .deleteAll()
          }}
        />

        <div className="flex space-y-4 mt-8 ml-8 md:block md:space-x-8">
          <button
            onClick={() => router.push('/request')}
            className="rounded-lg py-2 px-6 bg-transparent text-white border border-white mt-12 text-2xl 
        font-semibold cursor-pointer transition duration-150 ease-out hover:scale-75"
          >
            Start Campaign
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
