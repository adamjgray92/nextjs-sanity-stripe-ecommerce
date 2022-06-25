import React from 'react';

import { client } from '../lib/client';
import { Footer, FooterBanner, HeroBanner, Product } from '../components';

export default function Home({ products, banners }) {
  return (
    <>
      <HeroBanner
        buttonText={banners[0]?.buttonText}
        largeText1={banners[0]?.largeText1}
        midText={banners[0]?.midText}
        smallText={banners[0]?.smallText}
        product={banners[0]?.product}
        image={banners[0]?.image}
        desc={banners[0]?.desc}
      />
      <div className='products-heading'>
        <h2>Best Selling Projects</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => (
          <Product
            key={product?._id}
            image={product?.image}
            name={product?.name}
            slug={product?.slug.current}
            price={product?.price}
          />
        ))}
      </div>
      <FooterBanner banner={banners && banners[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banners,
    },
  };
};
