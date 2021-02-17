const { gql } = require('apollo-server');

const typeDefs = gql`

  type Country {
    name: String!
    population: Int!
    isInBucket: Boolean!
    area: Float
    capital: String!
    demonym: String!
    languages: [String]
    latlng: [Float]
    region: String
    subregion: String
    gini: Float
  }

  type Query {
    placesData(
      pageSize: Int
      after: String
    ): CountryConnection!
  }

  """
Simple wrapper around our list of countries that contains a cursor to the
last item in the list. Pass this cursor to the countries query to fetch results
after these.
"""

  type CountryConnection { # add this below the Query type as an additional type.
    cursor: String
    hasMore: Boolean!
    countries: [Country]!
  }
`;

module.exports = typeDefs;
