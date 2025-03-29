import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import instance from '../../config/axiosConfig'

export default function FilterSidebar() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const navigate = useNavigate()
  const [filter, setFilter] = useState(null)

  const getEnumFilters = async () => {
    try {
      const res = await instance.get('/filters')
      console.log(res.data)
      setFilter(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEnumFilters()
  }, [])

  const [priceRange, setPriceRange] = useState([0, 100]);

  // useEffect(() => {
  //   const params = Object.fromEntries([...searchParams])

  //   setFilter({
  //     category: params.category || "",
  //     gender: params.gender || "",
  //     color: params.color || "",
  //     size: params.size ? params.size.split(',') : [],
  //     material: params.material || [],
  //     brand: params.brand || [],
  //     minPrice: params.minPrice || 0,
  //     maxPrice: params.maxPrice || 100
  //   })
  //   setPriceRange([0, params.maxPrice || 100])

  // }, [searchParams])

  // const handleFilterChange = (e) => {
  //   const { name, value, checked, type } = e.target

  //   const newFilters = { ...filter }

  //   if (type === 'checkbox') {
  //     if (checked) {
  //       newFilters[name] = [...(newFilters[name] || []), value]
  //     } else {
  //       newFilters[name] = newFilters[name].filter((item) => item !== value)
  //     }
  //   } else {
  //     newFilters[name] = value
  //   }
  //   setFilter(newFilters)
  //   updateURLParams(newFilters)
  // }

  // const updateURLParams = (newFilters) => {
  //   const params = new URLSearchParams()
  //   Object.keys(newFilters).forEach((key) => {
  //     if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
  //       params.append(key, newFilters[key].join(','))
  //     } else if (newFilters[key]) {
  //       params.append(key, newFilters[key])
  //     }
  //   })
  //   setSearchParams(params)
  //   navigate(`?${params.toString()}`) //category=1&size=S
  // }

  // const handlePriceChange = (e) => {
  //   const newPrice = e.target.value
  //   setPriceRange([0, newPrice])
  //   const newFilters = { ...filter, minPrice: 0, maxPrice: newPrice }
  //   setFilter(filter)
  //   updateURLParams(newFilters)
  // }

  return (
    <div className='p-4 border-r border-gray-200'>
      <h3 className='text-xl font-medium text-gray-800 mb-4'>
        Filter
      </h3>

      <div className='mb-8'>
        <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
        <input type="range" name='priceRange' min={0} max={100}
          className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
          value={priceRange[1]}
        />
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Category</label>
        {
          filter?.categories?.map((category) => (
            <div key={category} className='flex items-center mb-1'>
              <input type="radio"
                name="category"
                value={category}
                className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
              />
              <span className='text-gray-700'>{category}</span>
            </div>
          ))}
      </div>

      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Gender</label>
        {
          filter?.genders?.map((gender) => (
            <div key={gender}
              className='flex items-center mb-1'>
              <input type="radio"
                name="gender"
                value={gender}
                className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
              />
              <span className='text-gray-700'>
                {gender}
              </span>
            </div>
          ))
        }
      </div>

      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Loại máy</label>
        {filter?.movements?.map((size) => (
          <div key={size} className='flex items-center mb-1'>
            <input type="checkbox" value={size}
              // checked={filter.size.includes(size)}
              name='size' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />

            <span className='text-gray-700'>{size}</span>
          </div>
        ))}
      </div>

      {/* <button onClick={handleResetFilter}>Reset filter</button> */}
    </div>
  )
}
