import { TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useCreateTestForm from '../../hooks/useCreateTestForm';
import TimeLimitPicker from '../UI/inputs/TimeLimitPicker';
import disableDragEvent from '../../pages/CreateTestPage/utils/disableDragEvent';

interface Props extends TimePickerProps<Dayjs> {
  questionIndex: number;
  error?: boolean;
}

const CreateTestFormTimeLimitPicker: React.FC<Props> = ({ questionIndex, error, ...props }) => {
  const { control, trigger } = useCreateTestForm();

  return (
    <Controller
      name={`questions.${questionIndex}.timeLimit`}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, ref, value, disabled } = field;

        const onTimeLimitChange = (e: dayjs.Dayjs | null) => {
          onChange(e);
          trigger(`questions.${questionIndex}.timeLimit`);
        };

        return (
          <TimeLimitPicker
            maxTime={dayjs().startOf('day').hour(1)}
            ampm={false}
            value={value}
            onClose={onBlur}
            onChange={onTimeLimitChange}
            slotProps={{
              textField: {
                onDragStart: disableDragEvent,
                onDragEnd: disableDragEvent,
                onDragEnter: disableDragEvent,
              },
            }}
            disabled={disabled}
            error={error}
            ref={ref}
            {...props}
          />
        );
      }}
    />
  );
};

export default CreateTestFormTimeLimitPicker;
