import { Modal, ModalProps, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useForgotPassword from '../hooks/queries/useForgotPassword';
import LoadingButton from './UI/buttons/LoadingButton';
import { Nullable } from '../types/utils/Nullable';
import Button from './UI/buttons/Button';
import AlertSnackbar from './UI/AlertSnackbar';

interface Props extends Omit<ModalProps, 'children'> {}

const ResetPasswordSchema = z.object({
  email: z.string().email().min(0),
});

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const { sendRecoveryEmail, reset, isPending, isError, error } = useForgotPassword();

  const [successMessage, setSuccessMessage] = useState<Nullable<string>>(null);

  const onSubmit = handleSubmit((data) => {
    sendRecoveryEmail(
      { email: data.email, redirectUrl: `${window.location.href.split('#')[0]}#/reset-password` },
      {
        onSuccess: (message) => setSuccessMessage(message),
      },
    );
  });

  return (
    <>
      <Modal
        disableScrollLock
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={open}
        onClose={onClose}
      >
        <Stack
          component="form"
          noValidate
          onSubmit={onSubmit}
          width={400}
          borderRadius={2}
          bgcolor="background.paper"
          padding={3}
          gap={2}
        >
          {successMessage !== null ? (
            <Stack justifyContent="center" alignItems="center">
              <Typography sx={{ py: 3 }} textAlign="center" variant="h1">
                🎉
              </Typography>

              <Typography textAlign="center" sx={{ mb: 1 }} variant="h6">
                {successMessage}
              </Typography>

              <Button onClick={() => onClose!({}, 'escapeKeyDown')}>Close</Button>
            </Stack>
          ) : (
            <>
              <Typography id="password-modal-title" variant="h6">
                Enter your email
              </Typography>
              <TextField
                {...register('email')}
                error={!!errors.email}
                required
                helperText={errors.email?.message?.toString()}
                fullWidth
                label="Email"
                type="email"
                placeholder="Enter email"
              />
              <LoadingButton variant="contained" size="large" loading={isPending} type="submit">
                Send recovery email
              </LoadingButton>
            </>
          )}
        </Stack>
      </Modal>
      <AlertSnackbar severity="error" open={isError} onClose={() => reset()}>
        {error?.message}
      </AlertSnackbar>
    </>
  );
};

export default ResetPasswordModal;
