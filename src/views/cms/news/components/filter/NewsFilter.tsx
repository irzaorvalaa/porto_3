import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { INewsFilter, INewsFilterProps } from './interfaces'
import { allOption, allYear, initialStateNewsFilter } from './constants'
import './NewsFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const NewsFilter = ({
  campusOptions = [],
  yearOption = allYear,
  loading = false,
  onShow,
}: INewsFilterProps) => {

  // State
  const [filter, setFilter] = React.useState<INewsFilter>({
    ...initialStateNewsFilter,
  })
  const [filterYear, setFilterYear] = React.useState<IFormDataOption>(yearOption[1])
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof INewsFilter, value: string) => {
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
      <div className="datagrid--toolbar-filter__container">
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Year</FormLabel>
            <Autocomplete
              disableClearable
              value={filterYear}
              options={allYear}
              onChange={(_, newValue) => {
                setValue('year', newValue.value)
                setFilterYear(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Campus</FormLabel>
            <Autocomplete
              disableClearable
              value={filterCampus}
              options={[allOption, ...campusOptions]}
              onChange={(_, newValue) => {
                setValue('campusID', newValue.id)
                setFilterCampus(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" error={requiredCampus !== ''} helperText={requiredCampus} />}
            />
          </FormControl>
        </div>
      </div>
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

export default NewsFilter
