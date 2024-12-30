import * as React from 'react'
import { useSnackbar } from 'notistack'
import { ButtonBase, Skeleton, Breadcrumbs } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import { ICollection } from '../../interfaces/ICollection'
import { initialCollectionState } from '../../constants/CollectionState'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchCollection } from './utilities'
import './Collection.scss'

import { ReactComponent as NoData } from '../../assets/svg/no-data.svg'

const Collection = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { category } = useParams()

  // State
  const { reducer } = useLocalState<ICollection[]>()
  const [state, dispatch] = React.useReducer(reducer, initialCollectionState)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    ;(async () => {
      try {
        dispatch({ type: 'request' })

        const response = await fetchCollection(category as string, controller.signal)

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
  }, [category])

  return (
    <div className="collection">
      <div className="collection__container">
        <Breadcrumbs separator="›" className="collection__breadcrumb">
          <NavLink to="/" className="collection__breadcrumblink">
            Home
          </NavLink>
          <NavLink to={`/collection/${category}`} className="collection__breadcrumblink--current">
            {category}
          </NavLink>
        </Breadcrumbs>
        <div className="collection__header">Show Collection for `{category}`</div>
        <div className="collection__grid">
          {state.isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <div key={index}>
                <Skeleton variant="rectangular" className="collection__loading--img" />
                <Skeleton variant="text" className="collection__loading--text" />
              </div>
            ))
          ) : state.data && state.data.length > 0 ? (
            state.data.map((collection, index) => (
              <NavLink key={index} to={`/detail/${collection.id}`}>
                <ButtonBase className="collection__collection">
                  <img src={collection.collectionImgUrl} />
                  <div className="collection__title">{collection.title}</div>
                </ButtonBase>
              </NavLink>
            ))
          ) : (
            <div className="collection__empty">
              <NoData />
              <div className="collection__empty--title">No collection available</div>
              <div className="collection__empty--caption">
                No collection available are related to this category
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
