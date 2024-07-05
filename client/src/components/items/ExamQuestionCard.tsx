import { StackProps, CardProps, CircularProgress } from '@mui/material';
import { Card, CardHeader, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Typography, CardActions, Stack } from '@mui/material';
import CircularProgressWithLabel from '../UI/CircularProgressWithLabel';
import { ExamCurrentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import AnswerGroup from '../UI/AnswersGroup/AnswersGroup';
import Timer from '../UI/Timer';
import DottedText from '../UI/DottedText/DottedText';
import QuestionType from '../../types/api/enums/Type';

interface Props extends StackProps {
  question: ExamCurrentQuestion;
  onAnswer: (answers: StudentAnswer[]) => void;
  questionsAmount: number | undefined;
  cardProps?: CardProps;
}

const ExamQuestionCard: React.FC<Props> = (props) => {
  const { question, questionsAmount, cardProps, onAnswer, ...rest } = props;
  const [timesUp, setTimesUp] = useState(false);
  const { title, answers, maxScore, type, index } = question;
  const opacity = timesUp ? 0.5 : 1;
  const questionIndex = index + 1;

  const handleAnswer = (newAnswers: StudentAnswer[]) => {
    onAnswer(newAnswers);
  };

  useEffect(() => {
    setTimesUp(false);
  }, [questionIndex]);

  return (
    <Stack {...rest}>
      <Timer
        endDate={question.timeExpiresAt}
        duration={question.timeLimit * 1000}
        restartDeps={[questionIndex]}
        onEnd={() => setTimesUp(true)}
      />

      <Card
        elevation={3}
        {...cardProps}
        sx={{ position: 'relative', userSelect: 'none', p: 2, ...cardProps?.sx }}
      >
        {timesUp && (
          <Stack
            alignItems="center"
            spacing={3}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress size={60} />
            <Stack direction="row" spacing={2.5}>
              <DottedText align="center" variant="body1">
                Please hold on, something wonderful is coming
              </DottedText>
              <Typography variant="body1">😊</Typography>
            </Stack>
          </Stack>
        )}
        <CardHeader title={title} sx={{ paddingBlock: 1, opacity }} />

        <CardContent component={Stack} sx={{ paddingBlock: 0, opacity }}>
          <Typography variant="caption" color={(t) => t.palette.text.secondary}>
            You can change your answer until time's up or everyone has responded.
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              Max score: {maxScore}
            </Typography>

            {questionsAmount && (
              <CircularProgressWithLabel
                size={50}
                thickness={3}
                value={(questionIndex / questionsAmount) * 100}
                label={`${questionIndex}/${questionsAmount}`}
              />
            )}
          </Stack>
        </CardContent>

        <CardActions>
          <Stack gap={1} mt={2} pl={2} alignItems="flex-start" width="100%">
            <Typography sx={{ opacity }} variant="body2" color="text.secondary">
              {type === QuestionType.SINGLE_CHOICE
                ? 'Choose one option'
                : 'Select multiple options'}
            </Typography>

            <AnswerGroup
              disabled={timesUp}
              answers={answers}
              onAnswer={handleAnswer}
              questionType={type}
            />
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  );
};

export default ExamQuestionCard;
