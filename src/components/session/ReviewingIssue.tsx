import React, { FunctionComponent } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'

import { ReviewingIssue as ReviewingIssueType } from '~generated/graphql'

interface ReviewingIssueProps {
  reviewingIssue: ReviewingIssueType | null
  fieldsEnabled: boolean
}

export const ReviewingIssue: FunctionComponent<ReviewingIssueProps> = props => {
  return (
    <Grid container item direction="column" spacing={4} style={{ maxWidth: '20vw' }}>
      <Grid item>
        <Typography variant="h5">Reviewing Issue</Typography>
      </Grid>
      <Grid item>
        <TextField
          id="issue-title"
          label="Title"
          disabled={!props.fieldsEnabled}
          value={props.reviewingIssue?.title ?? ''}
          fullWidth={true}
        />
      </Grid>
      <Grid item>
        <TextField
          id="issue-url"
          label="URL"
          disabled={!props.fieldsEnabled}
          value={props.reviewingIssue?.url ?? ''}
          fullWidth={true}
        />
      </Grid>
      <Grid item>
        <TextField
          id="issue-description"
          label="Description"
          disabled={!props.fieldsEnabled}
          value={props.reviewingIssue?.description ?? ''}
          multiline={true}
          rows={3}
          fullWidth={true}
        />
      </Grid>
    </Grid>
  )
}
