import * as React from 'react'
import { useSnackbar } from 'notistack'
import { Breadcrumbs, Typography, ButtonBase, Skeleton } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import { ICollection } from '../../interfaces/ICollection'
import { initialCollectionState } from '../../constants/CollectionState'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchCollection } from './utilities'
import './Search.scss'

import { ReactComponent as NoData } from '../../assets/svg/no-data.svg'

const Search = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { keyword } = useParams()

  // State
  const { reducer } = useLocalState<ICollection[]>()
  const [state, dispatch] = React.useReducer(reducer, initialCollectionState)

  React.useEffect(() => {
    ;(async () => {
      try {
        dispatch({ type: 'request' })

        const response = await fetchCollection(keyword as string, controller.signal)

        const { data, status, message } = response.data

        if (!status) throw message

        dispatch({ type: 'success', data })
      } catch (err) {
        const errorMessage = err as string

        if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

        dispatch({ type: 'failure', error: errorMessage })
      }
    })()

    return () => {
      controller.abort()
    }
  }, [keyword])

  return (
    <div className="search">
      <div className="search__container">
        <Breadcrumbs separator="›" className="search__breadcrumb">
          <NavLink to="/" className="search__breadcrumblink">
            Home
          </NavLink>
          <Typography className="search__breadcrumblink">Search</Typography>
          <NavLink to={`/search/${keyword}`} className="search__breadcrumblink--current">
            {keyword}
          </NavLink>
        </Breadcrumbs>
        <div className="search__header">Result for `{keyword}`</div>

        <div className="search__grid">
          {state.isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <div key={index}>
                <Skeleton variant="rectangular" className="search__loading--img" />
                <Skeleton variant="text" className="search__loading--text" />
              </div>
            ))
          ) : state.data && state.data.length > 0 ? (
            state.data.map((collection, index) => (
              <NavLink key={index} to={`/detail/${collection.id}`}>
                <ButtonBase className="search__collection">
                  <img src={collection.collectionImgUrl} />
                  <div className="search__title">{collection.title}</div>
                </ButtonBase>
              </NavLink>
            ))
          ) : (
            <div className="search__empty">
              <NoData />
              <div className="search__empty--title">No collection available</div>
              <div className="search__empty--caption">Please search for another collection</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
