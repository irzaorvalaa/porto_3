import * as yup from "yup";
import {
  createTheme,
  formLabelClasses,
  outlinedInputClasses,
} from "@mui/material";
import { ILoginExternalFormData } from "../interfaces";

const loginExternalSchema = yup.object({
  username: yup.string().required().email().label("Username"),
  password: yup.string().required().label("Password"),
  loginType: yup.string().required().oneOf(["1", "2"]).label("Login Type"),
});

const initialLoginExternalFormdata: ILoginExternalFormData = {
  username: "",
  password: "",
  loginType: "1",
};

const defaultTheme = createTheme();

const textFieldWhiteTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          [`&.${formLabelClasses.focused}`]: {
            color: defaultTheme.palette.common.white,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.common.white,
        },
        input: {
          ":-webkit-autofill, :-webkit-autofill:focus, :-internal-autofill-selected":
            {
              backgroundColor: "transparent !important",
              color: "white !important",
              transition: "background-color 600000s 0s, color 600000s 0s",
            },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.common.white,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: defaultTheme.palette.common.white,
          },
          [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: defaultTheme.palette.common.white,
            },
        },
        notchedOutline: {
          borderColor: defaultTheme.palette.common.white,
        },
      },
    },
  },
});

export {
  loginExternalSchema,
  initialLoginExternalFormdata,
  textFieldWhiteTheme,
};
