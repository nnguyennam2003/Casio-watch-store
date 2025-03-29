import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import instance from '../config/axiosConfig'

export default function Home() {

  const [placeholderProducts, setPlaceholderProducts] = useState([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await instance.get('/products/best-seller')
        setPlaceholderProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      
      <div className='container mx-auto max-w-[1400px]'>
        <h2 className='text-3xl text-center font-bold mb-4 mt-14'>
          Features
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}
