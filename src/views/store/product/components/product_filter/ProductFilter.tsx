import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IProductFilter, IProductFilterProps } from './interfaces'
import { allOptions, initialStateProductFilter } from './constants'
import './ProductFilter.scss'

const ProductFilter = ({
  collectionTypeOptions = [],
  loading = false,
  onShow,
}: IProductFilterProps) => {
  // State
  const [filter, setFilter] = React.useState<IProductFilter>(initialStateProductFilter)
  const [selectedCollectionType, setSelectedCollectionType] =
    React.useState<IGeneralFetch>(allOptions)

  const setValue = (field: keyof IProductFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    if (onShow) onShow(filter)
  }

  return (
    <div className="collection-management-filter">
      <div className="collection-management-filter__container">
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Collection Type *</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedCollectionType}
              options={[allOptions, ...collectionTypeOptions]}
              onChange={(_, newValue) => {
                setValue('CollectionTypeID', newValue.id)
                setSelectedCollectionType(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Subject</FormLabel>
            <TextField
              size="small"
              value={filter.Subject}
              placeholder="Type here"
              onChange={(e) => setValue('Subject', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Title</FormLabel>
            <TextField
              size="small"
              value={filter.Title}
              placeholder="Type here"
              onChange={(e) => setValue('Title', e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Bibli</FormLabel>
            <TextField
              size="small"
              value={filter.Bibli}
              placeholder="Type here"
              onChange={(e) => setValue('Bibli', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Author</FormLabel>
            <TextField
              size="small"
              value={filter.Author}
              placeholder="Type here"
              onChange={(e) => setValue('Author', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="collection-management__formlabel">Publisher</FormLabel>
            <TextField
              size="small"
              value={filter.Publisher}
              placeholder="Type here"
              onChange={(e) => setValue('Publisher', e.target.value)}
            />
          </FormControl>
        </div>
      </div>
      <LoadingButton
        disableElevation
        variant="contained"
        color="secondary"
        className="button button--secondary collection-management-filter__button"
        loading={loading}
        disabled={loading}
        onClick={handleShow}
      >
        SHOW
      </LoadingButton>
    </div>
  )
}

export default ProductFilter
