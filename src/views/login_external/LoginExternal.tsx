import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { InputAdornment } from '@mui/material';
import { IconButton, InputLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../helpers';
import isFieldError from '../../utilities/isFieldError';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginSuccessMessage } from '../../constants/SuccessMessage';
import { ILoginExternalFormData, LoginType } from './interfaces';
import {
  initialLoginExternalFormdata,
  loginExternalSchema,
  textFieldWhiteTheme,
} from './constants';
import './LoginExternal.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as LogoBinus } from '../../assets/svg/logo-binus-color.svg';
import { ReactComponent as EyeIcon } from '../../assets/svg/icons/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../assets/svg/icons/eye-off.svg';

const LoginExternal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [loginType, setLoginType] = React.useState<LoginType>('1');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Redux
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Form Hook
  const {
    handleSubmit,
    setValue,
    reset,
    register,
    formState: { errors },
  } = useForm<ILoginExternalFormData>({
    defaultValues: initialLoginExternalFormdata,
    resolver: yupResolver(loginExternalSchema),
  });

  const onSubmit = (values: ILoginExternalFormData) => {
    dispatch();
    // authLoginFEFetch(values as IAuthLoginFERequest, (data, error) => {
    //   if (data) {
    //     enqueueSnackbar(loginSuccessMessage, { variant: 'success' })

    //     setTimeout(() => {
    //       reset(initialLoginFormdata)
    //       redirectToHome()
    //     }, 2000)
    //   }

    //   if (error) {
    //     enqueueSnackbar(error, { variant: 'error' })
    //   }
    // }),
  };

  const isLoggedIn = () => {
    if (auth.isLoggedIn) {
      // redirectToHome();
    }
  };

  const redirectToHome = React.useCallback(() => {
    return navigate('/', { state: { from: location }, replace: true });
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onChangeLoginType = (loginType: LoginType) => {
    setLoginType(loginType);
    setValue('loginType', loginType);
  };

  React.useEffect(() => {
    isLoggedIn();
  }, []);

  const theme = createTheme();

  return (
    <Box
      sx={{
        width: 500,
        height: 530,
        mx: 60,
        my: 10,
        backgroundColor: '#DADADA',
      }}
    >
      <LogoBinus className='logo-login--logo-login' />
      <InputLabel className='logo-login--label-text'>
        Sign in to your account
      </InputLabel>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              autoComplete='off'
              margin='normal'
              label='Username'
              placeholder='Username'
              error={isFieldError(errors, 'username')}
              helperText={errors.username?.message}
              {...register('username')}
            />
            <TextField
              fullWidth
              autoComplete='off'
              margin='normal'
              label='Password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              error={isFieldError(errors, 'password')}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? (
                        <EyeOffIcon className='login-page__button--icon' />
                      ) : (
                        <EyeIcon className='login-page__button--icon' />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
            />

            <LoadingButton
              fullWidth
              variant='contained'
              size='large'
              className='button button--secondary login-page__button--large'
              disableElevation
              sx={{ my: 2 }}
              loading={auth.isLoading}
              disabled={auth.isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </LoadingButton>

            <LoadingButton
              fullWidth
              variant='contained'
              size='large'
              className='button button--secondary login-page__button--large'
              disableElevation
              loading={auth.isLoading}
              disabled={auth.isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              STAFF Login
            </LoadingButton>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};
export default LoginExternal;
