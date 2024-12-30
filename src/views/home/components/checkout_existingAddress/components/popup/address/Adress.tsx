import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  Divider,
  dividerClasses,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import './Address.scss'

import AddressEditForm from './components/form'
import { DialogType, IDialogTypeOpen } from '../../../../../../../components/dialog_form/interfaces'
import { GridSelectionModel } from '@mui/x-data-grid'
import { IAddress } from './interfaces'
import { IAddressFormData } from './components/form/interfaces'
import { useLocalState } from '../../../../../../../helpers/useLocalState'
import { useSnackbar } from 'notistack'
import {
  initialStateAddress,
  initialStateAddressDetail,
  initialStateAddressForm,
} from './constants'
import { arrFormDigitalType } from './components/form/constants'
import { IAddressFilter } from './components/filter/interfaces'
import { fetchAddress, fetchAddressDetail, saveAddress } from './utilities'
import {
  deletedSuccessMessage,
  savedSuccessMessage,
} from '../../../../../../../constants/SuccessMessage'
import address from '../../../../../../../assets/data/delivery_address.json'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  open: boolean
  handleClose: any
}
const Address = ({ open, handleClose }: Props) => {
  //TRY
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateAddress)
  const [activeFilter, setActiveFilter] = React.useState<IAddressFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateAddressDetail)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateAddressForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IAddressFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchAddress(controller.signal, filter)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDetail = async (id: string) => {
    try {
      detailDispatch({ type: 'request' })

      const response = await fetchAddressDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IAddressFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveAddress(values as IAddressFormData, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })

      enqueueSnackbar(dialog === 'form' ? savedSuccessMessage : deletedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(dialog)

      await fetchData()
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      formDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onShow = (filter: IAddressFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IAddress) => {
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IAddress) => {
    formDispatch({ type: 'success', data: value })
    openDialog('delete')
  }

  const onDeleteBulk = (values: GridSelectionModel) => {
    console.group('MasterForm - onDeleteBulk')
    console.table(values)
    console.groupEnd()
  }

  const openDialog = (dialog: DialogType) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: DialogType) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    formDispatch({ type: 'success', data: null })
    detailDispatch({ type: 'success', data: null })
  }

  React.useEffect(() => {
    fetchData()

    return () => {
      controller.abort()
    }
  }, [])
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <div className="address">
        <Typography className="text-lg text-center font-bold">Choose Address</Typography>
        <Divider className="my-6" />
        <Box className="address__header">
          <Stack direction="row">
            <TextField
              id="search-bar"
              label="Enter a city name"
              variant="outlined"
              placeholder="Search..."
              fullWidth
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon style={{ fill: 'blue' }} />
            </IconButton>
            <Button onClick={() => openDialog('form')}>Add New Address</Button>
          </Stack>
        </Box>
        <Divider className="my-6" />
        {address.map((data) => (
          <div className="address__card" key={data.id}>
            <Stack direction="row">
              <div className="address__card--left">
                <h1 className="address__card--left__city">{data.city}</h1>
                <h1 className="address__card--left__name">{data.name}</h1>
                <h1 className="address__card--left__phone">{data.phoneNumber}</h1>
                <h1 className="address__card--left__address">{data.address}</h1>
              </div>
              <div className="address__card--right">
                <Stack direction="column" gap={3}>
                  <Button className="address__card--right__btn1">Choose Address</Button>
                  <Button className="address__card--right__btn2" onClick={() => openDialog('form')}>
                    <EditIcon />
                  </Button>
                </Stack>
              </div>
            </Stack>
          </div>
        ))}

        <AddressEditForm
          open={isOpen.form}
          defaultValue={detailState.data}
          typeOptions={arrFormDigitalType}
          loading={formState.isLoading}
          type={formState.data ? 'edit' : 'add'}
          onClose={() => closeDialog('form')}
          onConfirm={onSave}
        />
      </div>
    </Dialog>
  )
}

export default Address
