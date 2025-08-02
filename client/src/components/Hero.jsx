import React from 'react'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen' style={{ backgroundImage: "url('/gradientBackground.png')" }}>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center">
          Your Personalized Intern <br /> Dashboard
        </h1>
        <br />
        <p className="text-lg md:text-xl text-gray-500  text-center">
          Provide us your raised funds and relevant data and be part of this <br /> wonderful organization.
        </p>
    </div>
  )
}

export default Hero
