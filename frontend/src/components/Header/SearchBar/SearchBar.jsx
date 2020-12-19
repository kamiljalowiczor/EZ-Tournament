import React from 'react'
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '36px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

export default function SearchBar () {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Paper variant='outlined' className={classes.root}>
      <IconButton className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={t('search-placeholder')}
        inputProps={{
          'aria-label': 'search',
          style: { textAlign: 'center' },
          maxLength: 25
        }}
      />
    </Paper>
  )
}
