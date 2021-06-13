import gql from 'graphql-tag'

export const REVIEWS_QUERY = gql`
  query ReviewsQuery {
    reviews(limit: 20) {
      id
      text
      stars
      createdAt
      favorited
      author {
        id
        name
        photo
        username
      }
    }
  }
`