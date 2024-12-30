import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IReferenceClinicDatagridToolbarProps } from './interfaces'
import './ReferenceClinicDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const ReferenceClinicDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: IReferenceClinicDatagridToolbarProps) => {
  return (
    <div className="reference-clinic-toolbar">
      <div>
        {/* <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          disabled={loading}
          onClick={onAdd}
        >
          ADD REFERENCE CLINIC
        </Button>
        <Button
          disableElevation
          variant="contained"
          className="button reference-clinic-toolbar__delete"
          disabled={loading || disabledDelete}
          onClick={onDelete}
        >
          <DeleteIcon />
          <span>DELETE</span>
        </Button> */}
      </div>
      <div>
        <GridToolbarQuickFilter
          variant="outlined"
          size="small"
          className="datagrid__toolbar--quickfilter"
        />
      </div>
    </div>
  )
}

export default ReferenceClinicDatagridToolbar
