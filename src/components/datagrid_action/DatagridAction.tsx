import * as React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { IDatagridActionProps } from './interfaces'

// Icons
import { ReactComponent as DeleteIcon } from '../../assets/svg/icons/delete.svg'
import { ReactComponent as EditIcon } from '../../assets/svg/icons/edit.svg'

const DatagridAction = ({
  value,
  showEditButton = true,
  showDeleteButton = true,
  onEdit,
  onDelete,
}: IDatagridActionProps) => {
  return (
    <div>
      {showEditButton && (
        <Tooltip title="Edit" arrow disableInteractive>
          <IconButton onClick={() => onEdit?.(value)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {showDeleteButton && (
        <Tooltip title="Delete" arrow disableInteractive>
          <IconButton onClick={() => onDelete?.(value)}>
            <DeleteIcon className="text-red-500" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}

export default DatagridAction
