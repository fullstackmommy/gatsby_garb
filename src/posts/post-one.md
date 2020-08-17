---
title: "My First Markdown Post"
date: "2020-08-16"
---

This is the first post using Markdown!

Contentful as our Headless CMS / Creating and Managing Products with Contentful: Managing Environment Variables within Gatsby / Fetching Products from Contentful

```
npm install gatsby-source-contentful dotenv
```

in .env file, place space ID and access token from contentful

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

place these values in gatsby-config.js:

```
const dotenv = require('dotenv')

if(process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

{
    resolve: 'gatsby-source-contentful',
    options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    }
}
```

graphql query:

```
{
    allContentfulProduct {
        edges {
            node {
                slug
            }
        }
    }
}

...

const products = result.datsa.allContentfulProduct.edges
products.forEach(({ node: product }) => {
    createPage({
        path: `/products/${product.slug}`,
        component: ProductTemplate // make sure to create product-template.js
    })
})
```

product-template-js

```
const ProductTemplate = ({ data: { contentfulProduct}}) => (
    <Layout>
        <div>
            <h2>{contentfulProduct.name}</h2>
            <Img fluid={contentfulProduct.image.fluid} />
        </div>
    </Layout>
)

export const query = graphql`
    query($slug: String!) {
        contentfulProduct(slug: {eq: $slug}) {
            name
            price
            description
            createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
            image {
                fluid(maxWidth: 800) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`
```

Add ability to purchase products with snipcart

```
npm install gatsby-plugin-snipcart
```

in gatsby-config.js

```
{
    resolve: 'gatsby-plugin-snipcart',
    options: {
        apiKey: process.env.SNIPCART_API_KEY,
        autopop: true,
    }
}
```

in product-template.js

```
<button className="snipcart-add-item"
    data-item-id={contentfulProdut.slug}
    data-item-price={contentfulProduct.price}
    data-item-image={contentfulProduct.image.file.url}
    data-item-name={contentfulProduct.name}
    data-item-url={location.pathname}
>Add to Cart</button>
```

Adding a Summary in header.js:

```
<div className="snipcart-summary snipcart-checkout>
    <div>
        <strong>My Cart</strong>
    </div>
    <div>
        <span className="snipcart-total-items></span>
        Items in Cart
    </div>
    <div>Total price{' '}
        <span className="snipcart-total-price"></span>
    </div>
</div>
```
