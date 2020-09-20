import React, { useState } from 'react'
import { makeStyles, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
import BracketCard from './BracketCard'

import tempImage from '../../../common/assets/751.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto'
  },
  item: {
    margin: '0.5rem'
  }
}))

export default function BracketFormatRadioGroup (props) {
  const classes = useStyles()

  return (
    <RadioGroup row className={classes.root} name='bracketFormat' value={props.value}>
      <FormControlLabel
        className={classes.item}
        value='singleElimination'
        onClick={() => { props.changed('singleElimination') }}
        control={
          <BracketCard
            image={tempImage}
            active={props.value === 'singleElimination'}
            title='Single elimination'
            description='Super zabawa w drabince pojedynczego przepierdalania'
          />
        }
      />
      <FormControlLabel
        className={classes.item}
        value='doubleElimination'
        onClick={() => { props.changed('doubleElimination') }}
        control={
          <BracketCard
            image={tempImage}
            active={props.value === 'doubleElimination'}
            title='Double elimination'
            description='Super zabawa w drabince podwojnego przepierdalania'
          />
        }
      />
      <FormControlLabel
        className={classes.item}
        value='roundRobin'
        onClick={() => { props.changed('roundRobin') }}
        control={
          <BracketCard
            image={tempImage}
            active={props.value === 'roundRobin'}
            title='Round robin'
            description='Super zabawa w drabince ciaglego przepierdalania'
          />
        }
      />
    </RadioGroup>
  )
}
