import React, { useEffect } from 'react'
import classNames from 'classnames'
import { gql, useQuery } from '@apollo/client'
import Odometer from 'react-odometerjs'

const STARS_QUERY = gql`
  query StarsQuery {
    githubStars
  }
`

const STARS_SUBSCRIPTION = gql`
  subscription StarsSubscription {
    githubStars
  }
`

export default () => {
  // This way how we pull data every 5 seconds
  // const { data, loading, subscribeToMore } = useQuery(STARS_QUERY, {
  //   pollInterval: 5 * 1000
  // })

  const { data, loading, subscribeToMore } = useQuery(STARS_QUERY)

  useEffect(() => {
    /* First argument is the document, and then the updateQuery function, this function is called each time
     an event occurs

     first param in update query is the previous one, 
     the second is the subscription event data, it returns and updated query result
    */
    subscribeToMore({
      document: STARS_SUBSCRIPTION,
      updateQuery: (
        _,
        {
          subscriptionData: {
            data: { githubStars }
          },
        }
      ) => ({ githubStars })
    })
  }, [subscribeToMore])

  return (
    <a
      className={classNames('StarCount', { loading })}
      href="https://github.com/GraphQLGuide/guide"
      target="_blank"
      rel="noopener noreferrer"
    >
      {data && <Odometer value={data.githubStars} />}
    </a>
  )
}