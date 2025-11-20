import React from 'react'

function Button({type="button",onClick, children = "SIGN UP"}) {
    return (
        <button 
        type={type}
        onClick={onclick}
        className='shadow-md top-0 md:top-10 relative bg-transparent transition-all duration-500 hover:shadow-[inset_0_0_25px_#1479EA] text-blue-500  cursor-pointer font-bold py-2 px-15 xl:px-25  md:py-4 border-l-4 border-r-4 border-blue-500 rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-lg  '>
            <span className="absolute -top-2.5 left-[3%] w-[95%] h-[40%]  origin-center transition-all duration-500 hover:scale-0"></span>

            {/* Mimicking ::before */}
            <span className="absolute top-[80%] left-[3%] w-[95%] h-[40%]  origin-center transition-all duration-500 hover:scale-0"></span>

            <span className="relative z-10">{children}</span>
        </button>
    )
}

export default Button