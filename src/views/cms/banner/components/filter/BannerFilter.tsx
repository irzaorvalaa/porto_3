import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IBannerFilter, IBannerFilterProps } from './interfaces'
import { allOption, allYear, arrBannerStatus, initialStateBannerFilter } from './constants'
import './BannerFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const BannerFilter = ({
  yearOption = allYear,
  statusOption = arrBannerStatus,
  loading = false,
  onShow,
}: IBannerFilterProps) => {

  // State
  const [filter, setFilter] = React.useState<IBannerFilter>({
    ...initialStateBannerFilter,
  })
  const [filterYear, setFilterYear] = React.useState<IFormDataOption>(yearOption[1])
  const [filterStatus, setFilterStatus] = React.useState<IFormDataOption>(statusOption[0])
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IBannerFilter, value: string) => {
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
            <FormLabel className="datagrid--toolbar-filter__formlabel">Status</FormLabel>
            <Autocomplete
              disableClearable
              value={filterStatus}
              options={arrBannerStatus}
              onChange={(_, newValue) => {
                setValue('status', newValue.value)
                setFilterStatus(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
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

export default BannerFilter
