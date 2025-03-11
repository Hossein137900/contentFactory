import CategoryManager from '@/components/category'
import React from 'react'

import { Toaster } from 'react-hot-toast'

const Page = () => {
  return (
    <div className='flex justify-center items-center h-screen pt-20'>
        <CategoryManager />
    </div>
  )
}

export default Page