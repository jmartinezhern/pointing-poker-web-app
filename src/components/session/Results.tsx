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

  const distributionMap = votes
    .filter(vote => vote !== 0)
    .reduce((accum, value) => {
      const valueStr = String(value)

      accum.set(valueStr, (accum.get(valueStr) ?? 0) + 1)

      return accum
    }, new Map<string, number>())

  const distribution = Array.from(distributionMap) as [string, number][]

  const consensus = distribution.length === 1

  let majority: string | undefined
  let ties: [string, number][] = []

  if (!consensus) {
    const majorityDistribution = distribution.slice().sort((a, b) => Number(b[1]) - Number(a[1]))

    if (majorityDistribution[0][1] !== majorityDistribution[1][1]) {
      majority = majorityDistribution[0][0]
    }

    if (!majority) {
      ties = [majorityDistribution[0], majorityDistribution[1]]
      for (const points of majorityDistribution.slice(2)) {
        if (points[1] === majorityDistribution[1][1]) {
          ties.push(points)
        } else {
          break
        }
      }
    }
  }

  const tie = ties.length > 1

  const data = ([['Points', 'Votes']] as [[string, string | number]]).concat(
    distribution.slice().sort((a, b) => Number(a[0]) - Number(b[0]))
  )

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
          <Typography variant="body1">{distribution[0][0]}</Typography>
        </Grid>
      )}
      {tie && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Ties</Typography>
          <Typography variant="body1">{ties.map(value => value[0]).join(', ')}</Typography>
        </Grid>
      )}
      {abstainees > 0 && (
        <Grid container item direction="column" alignItems="center" style={{ width: '150px' }}>
          <Typography variant="h6">Abstained</Typography>
          <Typography variant="body1">{abstainees}</Typography>
        </Grid>
      )}
    </Grid>
  )
}
