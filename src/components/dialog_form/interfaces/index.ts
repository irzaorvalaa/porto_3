import * as React from "react";
import { DialogProps } from "@mui/material";

export declare interface IDialogFormProps<T = any> extends DialogProps {
  open: boolean;
  title?: string;
  type?: FormType;
  size?: FormSize;
  loading?: boolean;
  defaultValue?: any;
  children?: React.ReactNode;
  labelCancelButton?: string;
  labelConfirmButton?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  onCancel?: () => void;
  onConfirm?: (values?: T) => void;
  onClose?: () => void;
}
export declare interface IDialogFormDatagridProps<T = any> extends DialogProps {
  title?: string;
  type?: FormType;
  size?: FormSize;
  loading?: boolean;
  defaultValue?: any;
  children?: React.ReactNode;
  labelCancelButton?: string;
  labelConfirmButton?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  onCancel?: () => void;
  onConfirm?: (values?: T) => void;
  onClose?: () => void;
}
export type FormType = "add" | "edit" | "delete";

export type FormSize = "xs" | "sm" | "md" | "lg" | "xl";

export type DialogType = "form" | "delete";

export declare interface IDialogTypeOpen {
  form: boolean;
  delete: boolean;
}
