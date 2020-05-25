import React, { FunctionComponent } from 'react'
import { Chart } from 'react-google-charts'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'

interface Props {
  votes: number[]
}

export const Results: FunctionComponent<Props> = ({ votes }) => {
  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const abstainers = votes.filter(vote => vote === 0).length

  if (votes.length === 0 || votes.length === abstainers) {
    return <Typography variant="h5">There are no votes</Typography>
  }

  const distribution = Array.from(
    votes
      .filter(vote => vote !== 0)
      .reduce((accum, value) => {
        const valueStr = String(value)

        accum.set(valueStr, (accum.get(valueStr) ?? 0) + 1)

        return accum
      }, new Map<string, number>())
  ) as [string, number][]

  const consensus = distribution.length === 1

  let majority: string | undefined
  let ties: [string, number][] = []

  if (!consensus) {
    const majorityDistribution = distribution.slice().sort((a, b) => b[1] - a[1])

    if (majorityDistribution[0][1] !== majorityDistribution[1][1]) {
      majority = majorityDistribution[0][0]
    }

    if (!majority) {
      ties = [majorityDistribution[0], majorityDistribution[1]].concat(
        majorityDistribution.slice(2).filter(points => points[1] === majorityDistribution[1][1])
      )
    }
  }

  const data = ([['Points', 'Votes']] as [[string, string | number]]).concat(distribution)

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
          data={data}
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
      {majority && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Majority</Typography>
          <Typography variant="body1">{majority}</Typography>
        </Grid>
      )}
      {ties.length > 1 && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Ties</Typography>
          <Typography variant="body1">{ties.map(value => value[0]).join(', ')}</Typography>
        </Grid>
      )}
      {abstainers > 0 && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Abstained</Typography>
          <Typography variant="body1">{abstainers}</Typography>
        </Grid>
      )}
    </Grid>
  )
}
