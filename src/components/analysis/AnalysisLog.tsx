type AnalysisLogProps = {
  logs: string[];
};

export function AnalysisLog({ logs }: AnalysisLogProps) {
  return (
    <pre className="analysis-log" aria-live="polite">
      {logs.map((log) => `${log}\n`)}
      <span className="terminal-cursor">_</span>
    </pre>
  );
}
