import React from 'react'
import { makeStyles, RadioGroup, FormControlLabel } from '@material-ui/core'
import BracketCard from './BracketCard'

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
            // image={tempImage}
            active={props.value === 'singleElimination'}
            title='Single elimination'
            description=''
          />
        }
      />
      <FormControlLabel
        className={classes.item}
        value='doubleElimination'
        onClick={() => { props.changed('doubleElimination') }}
        control={
          <BracketCard
            // image={tempImage}
            active={props.value === 'doubleElimination'}
            title='Double elimination'
            description=''
          />
        }
      />
      <FormControlLabel
        className={classes.item}
        value='roundRobin'
        onClick={() => { props.changed('roundRobin') }}
        control={
          <BracketCard
            // image={tempImage}
            active={props.value === 'roundRobin'}
            title='Round robin'
            description=''
          />
        }
      />
    </RadioGroup>
  )
}
