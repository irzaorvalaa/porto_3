import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IProductCategoryFilter, IProductCategoryFilterProps } from './interfaces'
import { allOption, initialStateProductCategoryFilter } from './constants'
import './ProductCategoryFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const ProductCategoryFilter = ({ loading = false, onShow }: IProductCategoryFilterProps) => {
  // State
  const [filter, setFilter] = React.useState<IProductCategoryFilter>({
    ...initialStateProductCategoryFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IProductCategoryFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    // if (!filterCampus.id) {
    //   setRequiredCampus('Campus Location is required')
    // }

    if (onShow) {
      onShow(filter)
    }
  }

  return (
    <div className="datagrid--toolbar-filter">
      <div className="datagrid--toolbar-filter__container"></div>
      <LoadingButton
        disableElevation
        variant="contained"
        color="secondary"
        className="button button--secondary datagrid--toolbar-filter__button"
        loading={loading}
        disabled={loading}
        onClick={handleShow}
      >
        SHOW
      </LoadingButton>
    </div>
  )
}

export default ProductCategoryFilter
