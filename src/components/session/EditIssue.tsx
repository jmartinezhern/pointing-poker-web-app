import React, { FunctionComponent, useState } from 'react'
import { Button, Card, CardContent, CircularProgress, Fade, Grid, TextField } from '@material-ui/core'

import { useSetIssueMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'

interface Props {
  onConfirm?: () => void
  onCancel?: () => void
}

export const EditIssue: FunctionComponent<Props> = ({ onConfirm, onCancel }) => {
  const { id: sessionID } = useSession()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setURL] = useState('')

  const [setIssue, { loading }] = useSetIssueMutation()

  return (
    <Card>
      <CardContent>
        <Grid container item justify="center" spacing={4}>
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
          <Grid container item justify="center" spacing={2}>
            <Grid item>
              <Button onClick={onCancel}>Cancel</Button>
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

                  if (onConfirm) {
                    onConfirm()
                  }
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
      </CardContent>
    </Card>
  )
}
