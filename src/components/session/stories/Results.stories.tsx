import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '@material-ui/core'

import { Results } from '~components/session/Results'

storiesOf('Results', module)
  .addDecorator(story => <Container maxWidth="sm">{story()}</Container>)
  .add('No votes', () => <Results votes={[]} />)
  .add('Consensus', () => <Results votes={[1, 1, 1, 1]} />)
  .add('Majority', () => <Results votes={[1, 2, 5, 1, 1, 3, 100, 100, 8]} />)
  .add('Tie', () => <Results votes={[1, 100, 1, 2, 2, 5, 5, 7, 5, 2, 1, 100]} />)
  .add('Consensus with abstainees', () => <Results votes={[1, 1, 1, 1, 0]} />)
  .add('Majority with abstainees', () => <Results votes={[1, 2, 5, 1, 1, 3, 100, 100, 8, 0]} />)
  .add('Tie with abstainees', () => <Results votes={[1, 100, 1, 2, 2, 5, 5, 7, 5, 2, 1, 100, 0]} />)
