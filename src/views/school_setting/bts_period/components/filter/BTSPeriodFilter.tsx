import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IBTSPeriodFilter, IBTSPeriodFilterProps } from './interfaces'
import { allOption, initialStateBTSPeriodFilter } from './constants'
import './BTSPeriodFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const BTSPeriodFilter = ({
  campusOptions = [],
  loading = false,
  onShow,
}: IBTSPeriodFilterProps) => {
  // State
  const [filter, setFilter] = React.useState<IBTSPeriodFilter>({
    ...initialStateBTSPeriodFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IBTSPeriodFilter, value: string) => {
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  error={requiredCampus !== ''}
                  helperText={requiredCampus}
                />
              )}
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

export default BTSPeriodFilter
