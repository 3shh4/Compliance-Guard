import { useState } from "react";
import type { TrustTask, TrustTaskStatus } from "../../models/trust";

type DeveloperTasksProps = {
  tasks: TrustTask[];
};

const statuses: TrustTaskStatus[] = ["open", "planned", "done", "accepted-for-later"];

export function DeveloperTasks({ tasks }: DeveloperTasksProps) {
  const [taskStatuses, setTaskStatuses] = useState<Record<string, TrustTaskStatus>>(() =>
    Object.fromEntries(tasks.map((task) => [task.id, task.status]))
  );

  return (
    <section className="panel-card">
      <div className="panel-heading">
        <span className="eyebrow">Developer tasks</span>
        <h2>Actionable fixes to ship next</h2>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-row" key={task.id}>
            <div>
              <span className="mono">{task.id}</span>
              <h3>{task.title}</h3>
              <p>
                {task.area.replaceAll("-", " ")} / {task.estimatedEffort} effort / {task.suggestedOwner}
              </p>
            </div>
            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
            <select
              value={taskStatuses[task.id] ?? task.status}
              aria-label={`Task status for ${task.id}`}
              onChange={(event) =>
                setTaskStatuses((current) => ({
                  ...current,
                  [task.id]: event.target.value as TrustTaskStatus
                }))
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("-", " ")}
                </option>
              ))}
            </select>
          </article>
        ))}
      </div>
    </section>
  );
}
