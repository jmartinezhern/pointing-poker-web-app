import React, { FunctionComponent, useState } from 'react'
import { Button, CircularProgress, Fade, Grid, TextField } from '@material-ui/core'

import { useSetIssueMutation } from '~generated/graphql'

interface Props {
  sessionID: string
}

export const EditIssue: FunctionComponent<Props> = ({ sessionID }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setURL] = useState('')

  const [setIssue, { loading }] = useSetIssueMutation()

  return (
    <Grid container item>
      <Grid item>
        <TextField
          label="Title"
          onChange={event => {
            setTitle(event.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Description"
          onChange={event => {
            setDescription(event.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="URL"
          onChange={event => {
            setURL(event.target.value)
          }}
        />
      </Grid>
      <Grid container item>
        <Grid item>
          <Button
            onClick={async () => {
              await setIssue({
                variables: {
                  sessionID,
                  description: {
                    title,
                    description,
                    url,
                  },
                },
              })
            }}
          >
            Confirm
          </Button>
        </Grid>
        <Grid item>
          <Fade in={loading}>
            <CircularProgress />
          </Fade>
        </Grid>
      </Grid>
    </Grid>
  )
}
