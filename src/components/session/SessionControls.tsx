import React, { FunctionComponent, lazy, useState } from 'react'
import { Button, Grid, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { StopVotingButton } from '~components/session/StopVotingButton'
import { StartVotingButton } from '~components/session/StartVotingButton'

const useStyles = makeStyles(theme => ({
  controlButton: {
    backgroundColor: theme.palette.primary.main,
    foregroundColor: theme.palette.primary.contrastText,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

interface Props {
  sessionID: string
  votingStarted: boolean
}

export const SessionControls: FunctionComponent<Props> = ({ sessionID, votingStarted }) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const EditIssueComponent = lazy(async () => {
    return { default: (await import('~components/session/EditIssue')).EditIssue }
  })

  return (
    <Grid container item spacing={2}>
      <Grid item>
        {votingStarted ? <StopVotingButton sessionID={sessionID} /> : <StartVotingButton sessionID={sessionID} />}
      </Grid>
      <Grid item>
        <Button
          className={classes.controlButton}
          onClick={() => {
            setOpen(true)
          }}
        >
          Edit Reviewing Issue
        </Button>
      </Grid>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <EditIssueComponent
          sessionID={sessionID}
          onCloseModal={() => {
            setOpen(false)
          }}
        />
      </Modal>
    </Grid>
  )
}
