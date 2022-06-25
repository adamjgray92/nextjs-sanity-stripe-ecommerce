import SanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
  projectId: 'fyqnjq7c',
  dataset: 'production',
  apiVersion: '2022-06-22',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (src) => builder.image(src);
