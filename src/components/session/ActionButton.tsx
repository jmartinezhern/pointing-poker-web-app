import React, { FunctionComponent, MouseEventHandler } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  closeSessionButton: {
    backgroundColor: theme.palette.error.main,
    foregroundColor: theme.palette.error.contrastText,
  },
}))

interface Props {
  onPrimaryClick?: MouseEventHandler
  title: string
  description: string
  buttonText: string
  primaryActionText: string
  secondaryActionText: string
}

export const ActionButton: FunctionComponent<Props> = ({
  onPrimaryClick,
  title,
  description,
  buttonText,
  primaryActionText,
  secondaryActionText,
}) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  return (
    <Grid item>
      <Button
        className={classes.closeSessionButton}
        onClick={() => {
          setOpen(true)
        }}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {secondaryActionText}
          </Button>
          <Button
            onClick={event => {
              setOpen(false)

              if (onPrimaryClick) {
                onPrimaryClick(event)
              }
            }}
            color="primary"
            autoFocus
          >
            {primaryActionText}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
