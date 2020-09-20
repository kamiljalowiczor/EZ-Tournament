import React from 'react'
import MatchPair from './MatchPair'
import LineTo from 'react-lineto'

export default function Bracket () {
  const classx = 'A'
  const class2 = 'B'
  return (
    <div>
      super braket
      <MatchPair className={classx} linetoId={classx} />
      <MatchPair className={class2} linetoId={class2} />
      <LineTo from='A' to='B' />
    </div>
  )
}
