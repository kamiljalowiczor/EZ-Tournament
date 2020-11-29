import React, { useState, useRef } from 'react'
import { FormControl, OutlinedInput, InputAdornment, Button, makeStyles, Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  offscreen: {
    position: 'absolute',
    left: '-999em'
  },
  link: {
    margin: '0.25rem 0rem',
    width: '100%'
  }
}))

export default function LinkToCopy ({ link }) {
  const { t } = useTranslation()
  const classes = useStyles()

  const [isTooltipOpen, setTooltipOpen] = useState(false)
  const textArea = useRef(null)

  function copyToClipboard () {
    textArea.current.select()
    textArea.current.setSelectionRange(0, 999)

    document.execCommand('copy')
    setTooltipOpen(true)

    setTimeout(() => { setTooltipOpen(false) }, 1500)
  }

  return (
    <FormControl
      className={classes.link}
      variant='outlined'
    >
      <OutlinedInput
        readOnly
        value={link}
        endAdornment={
          <InputAdornment position='end'>
            <Tooltip
              title='Copied to clipboard!'
              PopperProps={{
                disablePortal: true
              }}
              open={isTooltipOpen}
              disableFocusListener
              disableHoverListener
            >
              <Button
                onClick={copyToClipboard}
                edge='end'
              >
                {t('copy')}
              </Button>
            </Tooltip>
          </InputAdornment>
        }
      />
      <textarea
        ref={textArea}
        defaultValue={window.location.href}
        className={classes.offscreen}
        aria-hidden='true'
      />
    </FormControl>
  )
}
