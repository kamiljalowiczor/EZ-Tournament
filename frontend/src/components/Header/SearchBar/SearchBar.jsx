import React from 'react'
import { makeStyles, Box, Paper, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    width: '40vw'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function SearchBar () {
  const classes = useStyles()

  return (
    <Box className={classes.showcaseBottom}>
      <Paper variant='outlined' className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={'Enter tournament\'s name or url'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{
            'aria-label': 'search',
            style: { textAlign: 'center', width: '100%' }
          }}
        />
      </Paper>
    </Box>
  )
}
