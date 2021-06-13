import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Favorite, Add } from '@material-ui/icons'
import get from 'lodash/get'
import { Fab, Modal } from '@material-ui/core'

import { useUser } from '../lib/useUser'

import AddReview from './AddReview'

import Review from './Review'
import { REVIEWS_QUERY } from '../graphql/Review'

export default () => {
  const [addingReview, setAddingReview] = useState(false)

  const { data: { reviews } = {}, loading } = useQuery(REVIEWS_QUERY)

  console.log(reviews, 'reviews')

  const { user } = useUser()
  const favoriteCount = get(user, 'favoriteReviews.length')

  return (
    <main className="Reviews mui-fixed">
      <div className="Reviews-header-wrapper">
        <header className="Reviews-header">
          {favoriteCount && (
            <div className="Reviews-favorite-count">
              <Favorite />
              {favoriteCount}
            </div>
          )}
          <h1>Reviews</h1>
        </header>
      </div>
      <div className="Reviews-content">
        {loading ? (
          <div className="Spinner" />
        ) : (
          reviews.map(review => <Review key={review.id} review={review} />)
        )}
        {user && (
          <div>
            <Fab
              onClick={() => setAddingReview(true)}
              color="primary"
              className="Reviews-add"
            >
              <Add />
            </Fab>

            <Modal open={addingReview} onClose={() => setAddingReview(false)}>
              <AddReview done={() => setAddingReview(false)} />
            </Modal>
          </div>
        )}
      </div>
    </main>
  )
}