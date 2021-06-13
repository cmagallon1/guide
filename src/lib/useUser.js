import { gql, useQuery } from '@apollo/client'

export const USER_QUERY = gql`
  query UserQuery {
    currentUser {
      id
      firstName
      name
      username
      email
      photo
      hasPurchased
    }
  }
`

export function useUser() {
  const { data, loading } = useQuery(USER_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return {
    user: data && data.currentUser,
    logginIn: loading,
  }
}