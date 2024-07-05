import { Box, Stack, TextField, TextFieldProps } from '@mui/material';
import { columnCenter } from '../../styles/flex';
import LoadingButton from '../UI/buttons/LoadingButton';
import { Nullable } from '../../types/utils/Nullable';
import AlertSnackbar from '../UI/AlertSnackbar';

interface Props {
  errorMessage: Nullable<string>;
  isLoading: boolean;
  onErrorClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  firstFieldProps: TextFieldProps;
  secondFieldProps: TextFieldProps;
  submitButtonText: string;
}

const LoginForm: React.FC<Props> = ({
  errorMessage,
  onErrorClose,
  onSubmit,
  isLoading,
  firstFieldProps,
  secondFieldProps,
  submitButtonText,
}) => {
  return (
    <Box component="form" noValidate sx={{ gap: '20px', ...columnCenter }} onSubmit={onSubmit}>
      <Stack width="300px" direction="column" spacing={2}>
        <TextField disabled={isLoading} fullWidth variant="outlined" {...firstFieldProps} />
        <TextField disabled={isLoading} fullWidth variant="outlined" {...secondFieldProps} />
      </Stack>
      <LoadingButton
        size="large"
        loading={isLoading}
        disableElevation
        variant="contained"
        type="submit"
        sx={{ minWidth: 200 }}
      >
        {submitButtonText}
      </LoadingButton>
      <AlertSnackbar severity="error" open={!!errorMessage} onClose={onErrorClose}>
        {errorMessage}
      </AlertSnackbar>
    </Box>
  );
};

export default LoginForm;
