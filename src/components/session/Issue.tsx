import React, { FunctionComponent } from 'react'
import { Card, CardContent, Link, Typography } from '@material-ui/core'

import { ReviewingIssue as ReviewingIssueType } from '~generated/graphql'

interface ReviewingIssueProps {
  reviewingIssue: ReviewingIssueType
}

export const Issue: FunctionComponent<ReviewingIssueProps> = ({ reviewingIssue }) => {
  return (
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
  )
}
