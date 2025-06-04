// This file will contain Shopify client configuration 

import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
})

export default client

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  description: string
  images: Array<{
    id: string
    url: string
    altText: string
  }>
  variants: Array<{
    id: string
    title: string
    price: string
    available: boolean
  }>
} 