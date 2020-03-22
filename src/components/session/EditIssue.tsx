import React, { FunctionComponent, useState } from 'react'
import { Button, Card, CardContent, CircularProgress, Collapse, Grid, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

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

  const [setIssue, { error, loading }] = useSetIssueMutation()

  return (
    <Card style={{ minHeight: '45vh', minWidth: '400px' }}>
      <CardContent>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Title"
              fullWidth={true}
              onChange={event => {
                setTitle(event.target.value)
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              multiline={true}
              fullWidth={true}
              rows={6}
              rowsMax={10}
              onChange={event => {
                setDescription(event.target.value)
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="URL"
              fullWidth={true}
              onChange={event => {
                setURL(event.target.value)
              }}
            />
          </Grid>
          <Grid container item justify="center" alignItems="center" direction="column" spacing={2}>
            <Grid container item justify="center" alignItems="center" direction="row" spacing={2}>
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
            </Grid>
            <Grid item>
              <Collapse in={loading}>
                <CircularProgress />
              </Collapse>
              <Collapse in={error !== undefined}>
                <Alert severity="error" style={{ maxWidth: '300px' }}>
                  {error?.message}
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
