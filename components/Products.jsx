import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'



const Products = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img 
            src={urlFor(image && image[0])} 
            alt="" 
            className="product-image"
            height={250}
            width={250} 
          />
          <p className='product-name'>
            {name}
          </p>
          <p className='product-price'>
            ${price}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Products