import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function useTournament () {
  const dispatch = useDispatch()
  const [tournamentData, setTournamentData] = useState({})
  const isLoading = useSelector(state => state.tournament.isLoading)
  const isRedirectedFromForm = useSelector(state => state.tournament.isRedirectedFromForm)
  const loadingError = useSelector(state => state.tournament.loadingError)

  function getDataAfterRedirectFromForm () {
    return {
      name: useSelector(state => state.tournament.name),
      host: useSelector(state => state.tournament.host),
      description: useSelector(state => state.tournament.description),
      contact: useSelector(state => state.tournament.contact),
      adminLink: useSelector(state => state.tournament.adminLink),
      publicLink: useSelector(state => state.tournament.publicLink)
    }
  }

  return {
    tournamentData,
    setTournamentData,
    isLoading,
    isRedirectedFromForm,
    loadingError,
    getDataAfterRedirectFromForm
  }
}
