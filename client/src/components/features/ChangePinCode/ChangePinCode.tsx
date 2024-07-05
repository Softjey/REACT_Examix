import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { Button, Stack } from '@mui/material';
import SetPinCodeDialog from './SetPinCodeDialog';
import { usePinCode } from '../../../store/contexts/PinCodeContext';

const ChangePinCode: React.FC = () => {
  const { pinCodeIsSet } = usePinCode();
  const [resetMode, setResetMode] = useState(false);
  const [setPinDialogOpen, setSetPinDialogOpen] = useState(false);

  const handlePinToggle = () => {
    setSetPinDialogOpen(true);

    setResetMode(pinCodeIsSet);
  };

  const handlePinChangeClick = () => {
    setSetPinDialogOpen(true);
    setResetMode(false);
  };

  const handleDialogClose = () => {
    setSetPinDialogOpen(false);
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        {pinCodeIsSet && (
          <Button
            sx={{ mr: 2, padding: '4px 8px', fontSize: '0.75rem' }}
            variant="outlined"
            color="primary"
            onClick={handlePinChangeClick}
          >
            Change PIN Code
          </Button>
        )}

        <Switch checked={pinCodeIsSet} onChange={handlePinToggle} />
      </Stack>

      <SetPinCodeDialog resetMode={resetMode} open={setPinDialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default ChangePinCode;
