import React, { useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

import { urlFor, client } from '../../lib/client';

export default function ProductDetails({ product, similarProducts }) {
  const { name, details, image, price } = product;
  const [index, setIndex] = useState(0);
  const { quantity, increaseQuantity, decreaseQuantity, onAdd } =
    useStateContext();
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
                key={i}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className='price'>£{price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decreaseQuantity}>
                <AiOutlineMinus />{' '}
              </span>
              <span className='num' onClick={console.log()}>
                {quantity}
              </span>
              <span className='plus' onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, quantity)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick=''>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {similarProducts?.map((item) => (
              <Product
                key={item._id}
                image={item.image}
                name={item.name}
                slug={item.slug.current}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const similarProductsQuery = `*[_type == "product" && slug.current != '${slug}']`;
  const similarProducts = await client.fetch(similarProductsQuery);

  return {
    props: {
      product,
      similarProducts,
    },
  };
};

export async function getStaticPaths() {
  const query = `*[_type == "product"] {
		slug {
			current
		}
	}`;
  const products = await client.fetch(query);

  const params = products?.map((product) => {
    return {
      params: { slug: product.slug.current },
    };
  });

  return {
    paths: [...params],
    fallback: 'blocking',
  };
}
