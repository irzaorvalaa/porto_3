import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IProductVariantFilter, IProductVariantFilterProps } from './interfaces'
import { allOption, initialStateProductVariantFilter } from './constants'
import './ProductVariantFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const ProductVariantFilter = ({ loading = false, onShow }: IProductVariantFilterProps) => {
  // State
  const [filter, setFilter] = React.useState<IProductVariantFilter>({
    ...initialStateProductVariantFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IProductVariantFilter, value: string) => {
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

export default ProductVariantFilter
