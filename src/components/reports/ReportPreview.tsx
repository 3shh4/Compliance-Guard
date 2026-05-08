export function ReportPreview({ markdown }: { markdown: string }) {
  return <pre className="markdown-preview">{markdown}</pre>;
}
