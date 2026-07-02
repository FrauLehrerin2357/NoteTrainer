import { useState, useCallback } from 'react';
import { TrainingConfig, TrainingResult, Screen } from './types';
import { StartScreen } from './components/StartScreen';
import { TrainingScreen } from './components/TrainingScreen';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [config, setConfig] = useState<TrainingConfig | null>(null);
  const [result, setResult] = useState<TrainingResult | null>(null);

  const handleStart = useCallback((cfg: TrainingConfig) => {
    setConfig(cfg);
    setScreen('training');
  }, []);

  const handleFinish = useCallback((res: TrainingResult) => {
    setResult(res);
    setScreen('result');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('start');
    setResult(null);
    setConfig(null);
  }, []);

  const handleCancel = useCallback(() => {
    setScreen('start');
  }, []);

  return (
    <div className="app">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'training' && config && (
        <TrainingScreen config={config} onFinish={handleFinish} onCancel={handleCancel} />
      )}
      {screen === 'result' && result && <ResultScreen result={result} onRestart={handleRestart} />}
    </div>
  );
}
