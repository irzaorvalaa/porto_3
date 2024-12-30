import * as React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { initialRoleManagementFormdata, RoleManagementSchema } from './constants'
import { IRoleManagementFormData, IRoleManagementFormProps } from './interfaces'
import isFieldError from '../../../../../utilities/isFieldError'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { IRoleManagementMenu } from '../../interfaces'

const RoleManagementForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  listMenu = [],
  detail = null,
  onConfirm,
  onClose,
  ...other
}: IRoleManagementFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm<IRoleManagementFormData>({
    defaultValues: initialRoleManagementFormdata,
    resolver: yupResolver(RoleManagementSchema),
  })
  const watchListRead = watch('listRead')
  const watchListCreate = watch('listCreate')
  const watchListUpdate = watch('listUpdate')
  const watchListDelete = watch('listDelete')

  const onEnter = () => {
    if (detail) {
      const selectedRead: string[] = detail.assignedMenu
        .filter((menu) => menu.isRead)
        .map((menu) => menu.menuID)
      const rawSelectedParentRead: string[] = detail.assignedMenu
        .filter((menu) => menu.isRead)
        .map((menu) => menu.parentID)

      for (const el of rawSelectedParentRead) {
        if (!selectedRead.includes(el)) selectedRead.push(el)
      }

      const selectedCreate: string[] = detail.assignedMenu
        .filter((menu) => menu.isCreate)
        .map((menu) => menu.menuID)
      const selectedUpdate: string[] = detail.assignedMenu
        .filter((menu) => menu.isUpdate)
        .map((menu) => menu.menuID)
      const selectedDelete: string[] = detail.assignedMenu
        .filter((menu) => menu.isDelete)
        .map((menu) => menu.menuID)

      setValue('action', 'Edit')
      setValue('id', defaultValue?.id)
      setValue('name', defaultValue?.name)
      setValue('listRead', selectedRead)
      setValue('listCreate', selectedCreate)
      setValue('listUpdate', selectedUpdate)
      setValue('listDelete', selectedDelete)
    }

    autoFocusRef.current?.focus()
  }

  const onExit = () => reset(initialRoleManagementFormdata)

  const onSubmit = (values: IRoleManagementFormData) => onConfirm?.(values)

  const getTitle = () => {
    const title = 'Role'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Add '.concat(title)
  }

  const getMenuLabel = (menu: IRoleManagementMenu) => {
    if (!menu.parentID) {
      return menu.name
    }

    const parent = listMenu?.find((parentMenu) => parentMenu.menuID === menu.parentID)

    if (!parent) {
      return menu.name
    }

    return `${parent.name} > ${menu.name}`
  }

  const handleMenu = (
    menu: IRoleManagementMenu,
    checked: boolean,
    type: string,
    isParent: boolean,
  ) => {
    if (type == 'read') {
      const currentSelectedRead = watchListRead
      let newSelectedRead: string[] = []
      if (!isParent) {
        if (checked) {
          newSelectedRead = [...(currentSelectedRead as string[]), menu.menuID as string]
          const parentExists = newSelectedRead.includes(menu.parentID as string)
          if (menu.parentID && !parentExists) {
            newSelectedRead = [...newSelectedRead, menu.parentID as string]
          }
        } else {
          newSelectedRead = currentSelectedRead?.filter(
            (selectedRead) => selectedRead !== menu.menuID,
          ) as string[]
        }
      } else {
        if (checked) {
          newSelectedRead = [...(currentSelectedRead as string[]), menu.menuID as string]
          const subMenu =
            listMenu?.filter((parentMenu) => parentMenu.parentID === menu.menuID) || []
          for (let i = 0; i < subMenu.length; i++) {
            const menuExist = newSelectedRead.includes(subMenu[i].menuID as string)
            if (subMenu[i].menuID && !menuExist) {
              newSelectedRead = [...newSelectedRead, subMenu[i].menuID as string]
            }
          }
        } else {
          const subMenu =
            listMenu?.filter((parentMenu) => parentMenu.parentID === menu.menuID) || []
          let tempData = currentSelectedRead?.filter(
            (selectedRead) => selectedRead !== menu.menuID,
          ) as string[]
          for (let i = 0; i < subMenu.length; i++) {
            tempData = tempData?.filter(
              (selectedRead) => selectedRead !== subMenu[i].menuID,
            ) as string[]
          }
          newSelectedRead = tempData
        }
      }
      setValue('listRead', newSelectedRead)
    }
  }
  const isMenuSelected = (menuID: string, type: string): boolean => {
    if (type == 'read') return watchListRead?.includes(menuID) as boolean
    else return false
  }

  return (
    <DialogForm
      open={open}
      title={getTitle()}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      TransitionProps={{
        onEnter: onEnter,
        onExit: onExit,
      }}
      {...other}
    >
      <form>
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Name *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'name')}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </FormControl>
        <Controller
          control={control}
          name="listRead"
          render={() => (
            <FormControl error={isFieldError(errors, 'listRead')} margin="normal">
              <FormLabel id="menu-group-label">Menu *</FormLabel>
              <FormGroup>
                {listMenu?.map((menu, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={isMenuSelected(menu.menuID, 'read')}
                        onChange={(e) => handleMenu(menu, e.target.checked, 'read', menu.isParent)}
                      />
                    }
                    label={getMenuLabel(menu)}
                  />
                ))}
              </FormGroup>
              {isFieldError(errors, 'listRead') && (
                <FormHelperText error={isFieldError(errors, 'listRead')}>
                  {errors?.listRead?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      </form>
    </DialogForm>
  )
}

export default RoleManagementForm
