import React from 'react'

import { client } from '../lib/client';

import {
  Products,
  HeroBanner, 
  FooterBanner
} from '../components'

const Home = ({ products, banner }) => {
  return (
    <div>
      
      <HeroBanner heroBanner={banner[0]} />
      <div className='products-heading'>
        <h2>Best Selling Poster</h2>
        <p>Posters of all Sizes</p>
      </div>

      <div className='products-container'>
        {products?.map(
          (product) => <Products key={product.id} product={product} />
        )}
      </div>

      <FooterBanner footerBanner={banner && banner[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner }
  }
}

export default Home;