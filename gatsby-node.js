const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    const postLayout = path.resolve(`./src/components/postLayout.js`)
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    // Variables can be added as the second function parameter
    return graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }
    `, { limit: 1000 }).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Create blog post pages.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                // Path for this page — required
                path: `/posts${node.frontmatter.slug}`,
                component: postLayout,
                context: {
                    slug: node.frontmatter.slug
                }
            });
        })
    })
}


