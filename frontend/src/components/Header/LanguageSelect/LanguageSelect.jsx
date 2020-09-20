import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(1),
    minWidth: 50
  },
  root: {
    background: 'white'
  },
  whiteColor: {
    color: 'white'
  },
  select: {
    padding: theme.spacing(1)
  }
}))

export default function LanguageSelect () {
  const { i18n } = useTranslation()

  const [language, setLanguage] = React.useState(i18n.language)

  const changeLanguage = lang => {
    if (lang === language) { return }
    window.localStorage.setItem('language', lang)
    i18n.changeLanguage(lang)
    setLanguage(lang)
  }

  if (i18n.language !== 'en' && i18n.language !== 'pl') { // unknown language, fallback to en
    changeLanguage('en')
  }

  const classes = useStyles()
  return (
    <FormControl className={classes.formControl} variant='outlined'>
      <Select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        displayEmpty
        classes={{
          root: classes.whiteColor,
          icon: classes.whiteColor,
          select: classes.select
        }}
        inputProps={{
          'data-testid': 'lang-menu'
        }}
      >
        <MenuItem value='en'>EN</MenuItem>
        <MenuItem value='pl'>PL</MenuItem>
      </Select>
    </FormControl>
  )
}
