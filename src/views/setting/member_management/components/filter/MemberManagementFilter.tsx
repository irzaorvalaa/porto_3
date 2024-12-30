import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IMemberManagementFilter, IMemberManagementFilterProps } from './interfaces'
import { allOption, initialStateMemberManagementFilter } from './constants'
import './MemberManagementFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const MemberManagementFilter = ({
  campusOptions = [],
  academicGroupOptions = [],
  academicOrganizationOptions = [],
  academicProgramOptions = [],
  loading = false,
  onShow,
}: IMemberManagementFilterProps) => {

  // State
  const arrUserType: IFormDataOption[] = [
    {
      value: '1',
      label: 'Student',
    },
    {
      value: '2',
      label: 'Lecturer',
    },
  ]

  const [filter, setFilter] = React.useState<IMemberManagementFilter>({
    ...initialStateMemberManagementFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [filterShowUser, setFilterShowUser] = React.useState<IFormDataOption>(arrUserType[0])
  const [filterAcademicGroup, setFilterAcademicGroup] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicOrganization, setFilterAcademicOrganization] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicProgram, setFilterAcademicProgram] = React.useState<IGeneralFetch>(allOption)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')
  

  const setValue = (field: keyof IMemberManagementFilter, value: string) => {
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
              renderInput={(params) => <TextField {...params} size="small" error={requiredCampus !== ''} helperText={requiredCampus} />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Show User</FormLabel>
            <Autocomplete
              disableClearable
              value={filterShowUser}
              options={arrUserType}
              onChange={(_, newValue) => {
                setValue('showUser', newValue.value)
                setFilterShowUser(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Group</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicGroup}
              options={[allOption, ...academicGroupOptions]}
              onChange={(_, newValue) => {
                setValue('academicGroup', newValue.id)
                setFilterAcademicGroup(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          { filterShowUser.value == "1" && (
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
          )}
          { filterShowUser.value == "2" && (
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Organization</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicOrganization}
              options={[allOption, ...academicOrganizationOptions]}
              onChange={(_, newValue) => {
                setValue('academicOrganization', newValue.id)
                setFilterAcademicOrganization(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          )}
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

export default MemberManagementFilter
