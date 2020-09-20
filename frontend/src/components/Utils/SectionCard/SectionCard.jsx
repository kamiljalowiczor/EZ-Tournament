import React from 'react'
import { makeStyles, Card, CardHeader } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2rem',
    margin: '3rem 0'
  },
  header: {
    textAlign: 'center'
  }
}))

export default function SectionCard (props) {
  const classes = useStyles()
  return (
    <Card variant='outlined' className={classes.root}>
      <CardHeader
        title={props.title}
        titleTypographyProps={{
          variant: 'h4'
        }}
        subheader={props.subheader}
        className={classes.header}
      />
      {props.children}
    </Card>
  )
}
