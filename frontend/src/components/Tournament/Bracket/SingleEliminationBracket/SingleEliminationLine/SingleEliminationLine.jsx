import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  line: props => ({
    position: 'absolute',
    top: props.top,
    left: props.left
  })
}))

export default function SingleEliminationLine (props) {
  const classes = useStyles({
    top: props.topOffset - 2,
    left: 205 // MatchPair width + 5
  })

  const {
    height,
    width
  } = props

  const d = `m 0 2 h ${width / 2} v ${height / 2} m ${width / 2} 0 h -${width / 2} v ${height / 2} h -${width / 2}`

  return (
    <svg className={classes.line} height={+height + 4} width={width}>
      <path stroke='black' strokeWidth='2' fill='none' d={d} />
    </svg>
  )
}
