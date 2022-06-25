import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

export default function Product({ image, name, slug, price }) {
  return (
    <div>
      <Link href={`/product/${slug}`} passHref>
        <div className='product-card'>
          {image && (
            <img
              src={urlFor(image[0])}
              alt={name}
              width={250}
              height={250}
              className='product-image'
            />
          )}
          <p className='product-name'>{name}</p>
          <p className='product-price'>&pound;{price}</p>
        </div>
      </Link>
    </div>
  );
}
