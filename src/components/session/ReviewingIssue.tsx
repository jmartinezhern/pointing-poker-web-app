import React, { FunctionComponent } from 'react'
import { Card, CardContent, Grid, Link, Typography } from '@material-ui/core'

import { ReviewingIssue as ReviewingIssueType } from '~generated/graphql'

interface ReviewingIssueProps {
  reviewingIssue: ReviewingIssueType
}

export const ReviewingIssue: FunctionComponent<ReviewingIssueProps> = ({ reviewingIssue }) => {
  return (
    <Grid container item direction="column" style={{ maxWidth: '300px' }} spacing={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reviewing Issue
          </Typography>
          <Typography variant="h6" gutterBottom>
            {reviewingIssue.title ?? ''}
          </Typography>
          <Typography gutterBottom>{reviewingIssue.description ?? ''}</Typography>
          {reviewingIssue.url && (
            <Link style={{ marginTop: '22px' }} href={reviewingIssue.url} target="_blank" rel="noreferrer">
              Link
            </Link>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}
