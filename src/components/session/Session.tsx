import React, { FunctionComponent, useState } from 'react'
import { Collapse, Grid, Modal, Typography } from '@material-ui/core'

import { LeaveSession } from '~components/session/LeaveSession'
import { CloseSession } from '~components/session/CloseSession'
import { Participants } from '~components/session/Participants'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { Results } from '~components/session/Results'
import { useSession } from '~components/session/SessionProvider'
import { useParticipant } from '~components/session/ParticipantProvider'
import { Session as SessionType, useSessionStateChangedSubscription } from '~generated/graphql'
import { EditIssue } from '~components/session/EditIssue'
import { SessionControls } from '~components/session/SessionControls'
import { VotingOptions } from '~components/session/VotingOptions'

function expirationTimestamp(delta: number): string {
  if (delta > 60 * 60) {
    return `${Math.floor(delta / (60 * 60))} hours`
  }

  if (delta > 60) {
    return `${Math.floor(delta / 60)} minutes`
  }

  return `${delta} seconds`
}

export const Session: FunctionComponent = () => {
  let session = useSession()

  const participant = useParticipant()

  const { data, loading } = useSessionStateChangedSubscription({
    variables: {
      sessionID: session.id,
    },
  })

  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = (): void => {
    setModalOpen(false)
  }

  if (!loading) {
    session = data?.sessionStateChanged as SessionType
  }

  const now = new Date()
  const expiresIn = new Date(session.expiresIn * 1000)

  const expires = (expiresIn.getTime() - now.getTime()) / 1000

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EditIssue onCancel={closeModal} onConfirm={closeModal} />
      </Modal>
      <Grid container item justify="flex-end" alignItems="center" direction="row" spacing={2}>
        {expires <= 1200 && (
          <Grid item>
            <Typography variant="h6" color="error">
              Session expires in {expirationTimestamp(expires)}
            </Typography>
          </Grid>
        )}
        {!participant.isModerator && <LeaveSession />}
        {participant.isModerator && <CloseSession />}
      </Grid>
      <Grid item>
        <Typography variant="h2">{session.name}</Typography>
      </Grid>
      <Grid item>
        <Collapse in={!session.votingStarted}>
          <Results
            votes={session.participants
              .filter(participant => !participant.isModerator)
              .map(participant => participant.vote?.points ?? 0)}
          />
        </Collapse>
      </Grid>
      {participant.isModerator && (
        <SessionControls
          votingStarted={session.votingStarted}
          onEditIssueClicked={() => {
            setModalOpen(true)
          }}
        />
      )}
      {session.votingStarted && !participant.isModerator && (
        <VotingOptions pointRange={{ max: session.pointingMax, min: session.pointingMin }} />
      )}
      <Grid container item justify="center" direction="row" spacing={2}>
        <Grid item>
          <ReviewingIssue reviewingIssue={session.reviewingIssue} />
        </Grid>
        <Grid item>
          <Participants participants={session.participants} votingStarted={session.votingStarted} />
        </Grid>
      </Grid>
    </Grid>
  )
}
