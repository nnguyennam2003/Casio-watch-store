import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function LoadingDetail() {
  return (
    <div>
      {/* <Skeleton /> */}
      <div className='flex flex-col md:flex-row'>
        {/* Left thumbnail */}
        <div className='hidden md:flex flex-col space-y-4 mr-6'>
          <Skeleton style={{ width: '80px', height: '400px' }} />
        </div>
        {/* Main image */}
        <div className='md:w-1/2'>
          <div className='mb-4'>
            <Skeleton style={{ width: '100%', height: '650px' }} />
          </div>
        </div>

        {/* Mobile thumbnail */}
        <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
          <Skeleton style={{ width: '300px', height: '400px' }} />
        </div>

        {/* Right side */}
        <div className='md:w-1/2 md:ml-10'>
          <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
            <Skeleton style={{ width: '100%', height: '100px' }} />
          </h1>

          <Skeleton style={{ width: '100%', height: '400px' }} />

          <div className='mt-10 text-gray-700'>

            <Skeleton style={{ width: '100%', height: '200px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
