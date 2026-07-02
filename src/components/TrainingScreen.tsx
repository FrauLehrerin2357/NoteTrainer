import { useState, useEffect, useCallback, useRef } from 'react';
import { TrainingConfig, Task, Answer, TrainingResult } from '../types';
import { generateTasks } from '../utils/training';
import { NoteDisplay } from './NoteDisplay';
import { AnswerButtons } from './AnswerButtons';
import { Statistics } from './Statistics';
import { notesByClef } from '../data/noteDefinitions';

interface TrainingScreenProps {
  config: TrainingConfig;
  onFinish: (result: TrainingResult) => void;
  onCancel: () => void;
}

export function TrainingScreen({ config, onFinish, onCancel }: TrainingScreenProps) {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [givenAnswer, setGivenAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime] = useState(Date.now);
  const [taskStartTime, setTaskStartTime] = useState(Date.now);
  const [taskIndex, setTaskIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [preloadedTask, setPreloadedTask] = useState<Task | null>(null);

  const taskQueueRef = useRef<Task[]>([]);
  const configRef = useRef(config);
  configRef.current = config;

  const notesList = notesByClef[config.clef].filter((n) =>
    config.selectedNoteIds.includes(n.id)
  );

  const maxTasks = config.trainingMode === 'fixed' ? config.taskCount : 999999;

  const loadNextTask = useCallback(() => {
    if (preloadedTask) {
      setCurrentTask(preloadedTask);
      setPreloadedTask(null);
    } else {
      const queue = taskQueueRef.current;
      if (queue.length === 0) {
        const newTasks = generateTasks(configRef.current, 10);
        taskQueueRef.current = newTasks;
      }
      const next = taskQueueRef.current.shift();
      setCurrentTask(next ?? null);
    }

    setGivenAnswer(null);
    setTaskStartTime(Date.now);
  }, [preloadedTask]);

  const preloadMore = useCallback(() => {
    const newTasks = generateTasks(configRef.current, 10);
    taskQueueRef.current = [...taskQueueRef.current, ...newTasks];
  }, []);

  useEffect(() => {
    const tasks = generateTasks(config, 10);
    taskQueueRef.current = tasks;
    const first = tasks.shift();
    setCurrentTask(first ?? null);
    setTaskStartTime(Date.now);
  }, [config]);

  useEffect(() => {
    if (taskQueueRef.current.length < 5) {
      preloadMore();
    }
    const nextTasks = generateTasks(configRef.current, 1);
    setPreloadedTask(nextTasks[0]);
  }, [currentTask, preloadMore, config]);

  function handleAnswer(answer: string) {
    if (!currentTask || givenAnswer) return;

    const responseTime = Date.now() - taskStartTime;
    const correct = answer === currentTask.correctAnswer;

    const newAnswer: Answer = {
      task: currentTask,
      givenAnswer: answer,
      correct,
      responseTime,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setGivenAnswer(answer);

    const newIndex = taskIndex + 1;

    if (newIndex >= maxTasks) {
      setTimeout(() => {
        setIsFinished(true);
        const result: TrainingResult = {
          config,
          answers: newAnswers,
          startTime,
          endTime: Date.now(),
          correctCount: newAnswers.filter((a) => a.correct).length,
          wrongCount: newAnswers.filter((a) => !a.correct).length,
          totalTime: Date.now() - startTime,
        };
        onFinish(result);
      }, 1500);
    } else {
      setTimeout(() => {
        setTaskIndex(newIndex);
        loadNextTask();
      }, 1500);
    }
  }

  if (isFinished) {
    return null;
  }

  if (!currentTask) {
    return <div className="training-screen"><p>Lade Aufgaben...</p></div>;
  }

  return (
    <div className="training-screen">
      <div className="training-header">
        <button className="cancel-btn" onClick={onCancel}>Zurück</button>
        <Statistics
          total={answers.length}
          correct={answers.filter((a) => a.correct).length}
          wrong={answers.filter((a) => !a.correct).length}
          startTime={startTime}
        />
      </div>

      <div className="note-display-area">
        <NoteDisplay
          clef={config.clef}
          note={currentTask.note}
          accidental={currentTask.accidental}
          keySignature={currentTask.keySignature}
        />
      </div>

      <AnswerButtons
        notes={notesList}
        notationSystem={config.notationSystem}
        accidentalType={config.accidentalType}
        onAnswer={handleAnswer}
        disabled={!!givenAnswer}
        correctAnswer={givenAnswer ? currentTask.correctAnswer : null}
        givenAnswer={givenAnswer}
      />
    </div>
  );
}
