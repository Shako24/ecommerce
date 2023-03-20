import React, { useState } from 'react';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';

import { Products } from '../../components';
import { StateContext, useStateContext } from '../../context/StateContext';


import { client, urlFor } from '../../lib/client';

const ProductDetails = ({ product, products }) => {

    const { image, name, detail, price } =  product;
    const [index, setIndex] = useState(0);

    const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }

    return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    <img src={urlFor(image && image[index])} alt="" className='product-detail-image' />
                </div>
                <div className="samll-images-container">
                    {image?.map((item , i) => (
                        <img key={i} src={urlFor(item)}
                        className={i === index ?
                        'small-image selected-image' :
                        'small-image' }
                        onMouseEnter={() => setIndex(i)  }
                        alt="" />
                    ))}
                </div>
            </div>
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>Details: </h4>
                <p>{detail}</p>
                <p className="price">${price}</p>
                <div className="quantity">
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                    <span className='minus' onClick={decQty} ><AiOutlineMinus /></span>
                    <span className='num' >{qty}</span>
                    <span className='plus' onClick={incQty} ><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className="buttons">
                    <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
                    <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>  
        </div>

        <div className='maylike-prducts-wrapper'>
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Products key={item.__id} product={item} />
                    ))}
                </div>
            </div>
        </div>

    </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const product = await client.fetch(query);
    const paths = product.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }

}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const product = await client.fetch(query);

    const productQuery = '*[_type == "product"]'
    const products = await client.fetch(productQuery);

  
    return {
      props: { product, products }
    }
  }
  

export default ProductDetails