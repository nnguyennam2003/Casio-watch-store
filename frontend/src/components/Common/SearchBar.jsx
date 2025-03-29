import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSearchToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(searchTerm)
        // setSearchTerm('')
        setIsOpen(false)
    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 'absolute top-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'} `}>

            {isOpen ? (
                <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                    <div className='relative w-1/2'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchTerm}
                            className='px-4 py-2 pl-2 pr-12 bg-gray-100 rounded-lg focus:outline-none w-full placeholder:text-gray-700' 
                            onChange={(e) => setSearchTerm(e.target.value)}    
                        />
                        <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                            <HiMagnifyingGlass className='w-6 h-6 text-gray-700' />
                        </button>
                    </div>
                    <button type='button' className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                        <HiMiniXMark className='w-6 h-6 text-gray-700' onClick={handleSearchToggle} />
                    </button>

                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className='w-6 h-6 text-gray-700' />
                </button>
            )}
        </div>
    )
}
