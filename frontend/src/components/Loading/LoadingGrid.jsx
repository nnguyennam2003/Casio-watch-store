import Skeleton from 'react-loading-skeleton'

import React from 'react'

export default function LoadingGrid() {
    return (
        <div className='container mx-auto max-w-[1400px] flex justify-between'>
            <Skeleton style={{ width: '300px', height: '400px' }} />
            <Skeleton style={{ width: '300px', height: '400px' }} />
            <Skeleton style={{ width: '300px', height: '400px' }} />
            <Skeleton style={{ width: '300px', height: '400px' }} />
        </div>
    )
}
