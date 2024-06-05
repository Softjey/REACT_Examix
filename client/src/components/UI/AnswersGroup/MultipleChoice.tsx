import { Checkbox, FormControlLabel, FormGroup, FormGroupProps } from '@mui/material';
import React, { useState } from 'react';
import AnswersGroupProps from './AnswersGroupProps';
import { StudentAnswer } from '../../../types/api/entities/question';

interface Props extends AnswersGroupProps, FormGroupProps {}

const MultipleChoice: React.FC<Props> = ({ answers, onAnswer, ...rest }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<StudentAnswer[]>([]);

  return (
    <FormGroup {...rest}>
      {answers.map(({ title }) => (
        <FormControlLabel
          key={title}
          onChange={(_, checked) => {
            setSelectedAnswers((prev) => {
              const newAnswers = checked
                ? [...prev, { title }]
                : prev.filter((answer) => answer.title !== title);

              onAnswer(newAnswers);

              return newAnswers;
            });
          }}
          control={<Checkbox />}
          checked={selectedAnswers.some((answer) => answer.title === title)}
          label={title}
        />
      ))}
    </FormGroup>
  );
};

export default MultipleChoice;
