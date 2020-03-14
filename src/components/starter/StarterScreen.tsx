import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, Button, Grid, Typography, Container, Card, TextField, CardContent } from '@material-ui/core'

const useStyles = makeStyles(() => {
  return {}
})

export const StarterScreen: FunctionComponent = () => {
  const history = useHistory()

  const classes = useStyles()

  return (
    <section>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Pointing Poker
        </Typography>
        <Grid container justify="center" spacing={4}>
          <Grid item>
            <Card>
              <Button
                color="primary"
                onClick={() => {
                  history.push('/create')
                }}
              >
                Create a session
              </Button>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <TextField fullWidth={true} />
                <Button color="primary" fullWidth={true}>
                  <Typography>Join a session</Typography>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
