import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { node } from "prop-types"

const BlogLink = styled(Link)`
  text-decoration: none
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>David's Thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>{node.frontmatter.title} - {node.frontmatter.date}</BlogTitle>
            </BlogLink>
              <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div>
  </Layout>
)

export const query = graphql`
  query MyQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`
