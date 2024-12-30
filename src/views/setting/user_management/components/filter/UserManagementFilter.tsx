import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IUserManagementFilter, IUserManagementFilterProps } from './interfaces'
import { allOption, initialStateUserManagementFilter } from './constants'
import './UserManagementFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const UserManagementFilter = ({
  campusOptions = [],
  academicProgramOptions = [],
  roleOptions = [],
  loading = false,
  onShow,
}: IUserManagementFilterProps) => {
  const allUserType: IFormDataOption[] = [
    {
      value: '',
      label: 'All',
    },
    {
      value: '1',
      label: 'Binusian',
    },
    {
      value: '2',
      label: 'External',
    },
  ]

  // State
  const [filter, setFilter] = React.useState<IUserManagementFilter>({
    ...initialStateUserManagementFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicProgram, setFilterAcademicProgram] = React.useState<IGeneralFetch>(allOption)
  const [filterUserType, setFilterUserType] = React.useState<IFormDataOption>(allUserType[0])
  const [filterRole, setFilterRole] = React.useState<IGeneralFetch>(allOption)

  const setValue = (field: keyof IUserManagementFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
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
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Program</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicProgram}
              options={[allOption, ...academicProgramOptions]}
              onChange={(_, newValue) => {
                setValue('academicProgram', newValue.id)
                setFilterAcademicProgram(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">User Type</FormLabel>
            <Autocomplete
              disableClearable
              value={filterUserType}
              options={allUserType}
              onChange={(_, newValue) => {
                setValue('userType', newValue.value)
                setFilterUserType(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Role</FormLabel>
            <Autocomplete
              disableClearable
              value={filterRole}
              options={[allOption, ...roleOptions]}
              onChange={(_, newValue) => {
                setValue('roleID', newValue.id)
                setFilterRole(newValue)
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

export default UserManagementFilter
