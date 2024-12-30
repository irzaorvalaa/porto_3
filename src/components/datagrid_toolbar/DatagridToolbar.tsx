import * as React from 'react';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { IDatagridToolbarProps } from './interfaces';

const DatagridToolbar = ({
  labelAddButton,
  labelDeleteButton,
  hideDeleteButton = true,
  hideAddButton = false,
  loading = false,
  onAdd,
  onDelete,
}: IDatagridToolbarProps) => {
  return (
    <div className="datagrid__toolbar">
      <div className="datagrid__toolbar__actionButton">
        {hideAddButton ? (
          <div />
        ) : (
          <Button
            variant="contained"
            className="button button--secondary datagrid__toolbar--button mr-6"
            disableElevation
            disabled={loading}
            onClick={onAdd}
          >
            {labelAddButton}
          </Button>
        )}
        {hideDeleteButton ? (
          <div />
        ) : (
          <Button
            variant="contained"
            className="button button--secondary datagrid__toolbar--button"
            disableElevation
            disabled={loading}
            onClick={onDelete}
          >
            {labelDeleteButton}
          </Button>
        )}
      </div>
      <GridToolbarQuickFilter
        variant="outlined"
        size="small"
        className="datagrid__toolbar--quickfilter"
      />
    </div>
  );
};

export default DatagridToolbar;
