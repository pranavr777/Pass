import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer max-w-4xl flex justify-between items-center p-2 gap-5">
      <div className='logo font-bold text-2xl'><span className='text-green-600'>&lt;</span>Pass<span className='text-green-600'>OP/&gt;</span></div>
        {/* <ul>
            <li className='flex gap-6'>
                <a href='/' className='hover:font-bold'>Home</a>
                <a href='#' className='hover:font-bold'>About</a>
                <a href='#' className='hover:font-bold'>Contact</a>
            </li>
        </ul> */}
        <div>
          <button title='Github'><img className='w-16 p-4 invert'src='/icons/github.png'  alt='github' ></img></button>
          
        </div>
      </div>
    
      
    </nav>
  )
}

export default Navbar