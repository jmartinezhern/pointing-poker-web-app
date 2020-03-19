import React, { FunctionComponent } from 'react'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Chart } from 'react-google-charts'

interface Props {
  votes: number[]
}

export const Results: FunctionComponent<Props> = ({ votes }) => {
  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const abstainees = votes.filter(vote => vote === 0).length

  if (votes.length === 0 || votes.length === abstainees) {
    return <Typography variant="h5">There are no votes</Typography>
  }

  const distribution = (Array.from(
    votes
      .filter(vote => vote !== 0)
      .reduce((accum, value) => {
        const valueStr = String(value)
        accum.set(valueStr, (accum.get(valueStr) ?? 0) + 1)

        return accum
      }, new Map<string, number>())
  ) as [string, number][]).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    }

    if (a[1] === b[1]) {
      return 0
    }

    return 1
  })

  const consensus = distribution.length === 1

  let ties: [string, number][] = []
  if (!consensus) {
    ties = distribution.reduce(
      (accum, value, idx) => {
        if (idx !== 0 && value[1] === accum[idx - 1][1]) {
          return accum.concat([value])
        }
        return accum
      },
      [distribution[0]]
    )
  }

  const tie = ties.length > 1

  const data: [[string, string | number]] = [['Points', 'Votes']]

  return (
    <Grid
      container
      item
      direction={matches ? 'column' : 'row'}
      justify="center"
      alignItems="center"
      alignContent="center"
      spacing={matches ? 2 : 0}
    >
      <Grid item>
        <Chart
          chartType="PieChart"
          data={data.concat(distribution)}
          options={{
            width: 200,
            backgroundColor: theme.palette.background.default,
            legend: 'none',
            pieSliceText: 'label',
            pieStartAngle: 100,
          }}
        />
      </Grid>
      {consensus && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Consensus!</Typography>
        </Grid>
      )}
      {abstainees > 0 && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Abstained</Typography>
          <Typography variant="body1">{abstainees}</Typography>
        </Grid>
      )}
      {!consensus && !tie && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Majority</Typography>
          <Typography variant="body1">{distribution[0][0]}</Typography>
        </Grid>
      )}
      {!consensus && !tie && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Runner-Up</Typography>
          <Typography variant="body1">{distribution[1][0]}</Typography>
        </Grid>
      )}
      {tie && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Ties</Typography>
          <Typography variant="body1">{ties.map(value => value[0]).join(', ')}</Typography>
        </Grid>
      )}
    </Grid>
  )
}
