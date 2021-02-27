import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  createStyles,
  Grid,
  IconButton,
  Link,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { ReviewingIssue, useSetIssueMutation } from '~generated/graphql'
import { useSession } from '~components/core/SessionProvider'

interface Props {
  allowEditing: boolean
  issue: ReviewingIssue
}
const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      marginTop: '15px',
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  })
)

export const Issue: FunctionComponent<Props> = ({ allowEditing, issue }) => {
  const { id: sessionID } = useSession()

  const classes = useStyles()

  const [editing, setEditing] = useState(false)

  const [title, setTitle] = useState(issue.title)
  const [description, setDescription] = useState(issue.description)
  const [url, setURL] = useState(issue.url)

  useEffect(() => {
    setTitle(issue.title)
    setDescription(issue.description)
    setURL(issue.url)
  }, [issue])

  const [setIssue, { error, loading }] = useSetIssueMutation()

  return (
    <Card className={classes.container}>
      <CardContent>
        <Grid container style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Reviewing Issue
            </Typography>
          </Grid>
          {allowEditing && !editing && (
            <Grid item>
              <IconButton component="span" onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Title"
              disabled={!editing}
              fullWidth={true}
              value={title}
              onChange={event => {
                setTitle(event.target.value)
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              disabled={!editing}
              multiline={true}
              fullWidth={true}
              rowsMax={10}
              value={description}
              onChange={event => {
                setDescription(event.target.value)
              }}
            />
          </Grid>
          <Grid item>
            {editing || !url ? (
              <TextField
                label="URL"
                disabled={!editing}
                fullWidth={true}
                value={url}
                onChange={event => {
                  setURL(event.target.value)
                }}
              />
            ) : (
              url && (
                <Link style={{ marginTop: '22px' }} href={url} target="_blank" rel="noreferrer">
                  Link
                </Link>
              )
            )}
          </Grid>
          <Grid container item justify="center" alignItems="center" direction="column" spacing={2}>
            <Grid container item justify="center" alignItems="center" direction="row" spacing={2}>
              {editing && (
                <Grid item>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                  <Button
                    onClick={async () => {
                      await setIssue({
                        variables: {
                          sessionID,
                          description: {
                            title: title === '' ? undefined : title,
                            description: description === '' ? undefined : description,
                            url: url === '' ? undefined : url,
                          },
                        },
                      })

                      setEditing(false)
                    }}
                  >
                    {loading ? <CircularProgress size={22} /> : 'Confirm'}
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item>
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
