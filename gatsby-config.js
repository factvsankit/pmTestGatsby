module.exports = {
  siteMetadata: {
    title: `Phil McMaster Site`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-next`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "manage.netprophets.com.au",
        protocol: "https",
        hostingWPCOM: false,
        verboseOutput: false
      }
    }
  ]
};
