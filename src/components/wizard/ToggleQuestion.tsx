type ToggleQuestionProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
};

export function ToggleQuestion({ label, description, checked, onChange }: ToggleQuestionProps) {
  return (
    <button className={checked ? "toggle-question enabled" : "toggle-question"} type="button" onClick={onChange}>
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <span className="toggle-pill">{checked ? "Yes" : "No"}</span>
    </button>
  );
}
