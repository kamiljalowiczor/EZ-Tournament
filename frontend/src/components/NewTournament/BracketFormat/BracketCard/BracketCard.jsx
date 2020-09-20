import React, { useState } from 'react'
import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 200,
    minHeight: 250
  },
  media: {
    height: 140
  },
  cardArea: {
    height: '100%'
  },
  text: {
    minHeight: 150
  }
}))

export default function BracketCard (props) {
  const classes = useStyles()

  return (
    <Card raised={props.active} className={classes.root}>
      <CardActionArea
        className={classes.cardArea}
        onClick={props.onClick}
      >
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.imageTitle}
        />
        <CardContent className={classes.text}>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
