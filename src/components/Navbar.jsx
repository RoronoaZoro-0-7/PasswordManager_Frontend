import React from 'react'


const Navbar = () => {
    return (
        <nav className='bg-slate-800 flex justify-between items-center px-4 h-14 py-5 text-white'>
            <div className="mycontainer">

                <div className='logo font-bold relative top-4 text-2xl'>
                    <span className='text-green-700 '>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-700 '>OP/ &gt;</span>
                </div>
                <ul className="flex justify-end gap-10">
                    <li><a className="hover:font-bold" href="/">Home</a></li>
                    <li><a className="hover:font-bold" href="#">Contact</a></li>
                    <li><a className="hover:font-bold" href="#">About</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
