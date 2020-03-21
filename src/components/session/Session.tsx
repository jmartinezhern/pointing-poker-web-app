import React, { FunctionComponent, useState } from 'react'
import { Grid, Modal, Typography } from '@material-ui/core'

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

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <EditIssue onCancel={closeModal} onConfirm={closeModal} />
      </Modal>
      <Grid container item>
        {!participant.isModerator && <LeaveSession />}
        {participant.isModerator && <CloseSession />}
      </Grid>
      <Grid item>
        <Typography variant="h2">{session.name}</Typography>
      </Grid>
      <Grid item>
        {!session.votingStarted && (
          <Results
            votes={session.participants
              .filter(participant => !participant.isModerator)
              .map(participant => participant.vote.points)}
          />
        )}
      </Grid>
      <Grid item>
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
      </Grid>
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
