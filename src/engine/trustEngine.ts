import { normalizeProfile } from "../data/trustOptions";
import type { TrustProfile, TrustReport } from "../models/trust";
import { generateMarkdownReport } from "./trustReportGenerator";
import { generateTrustPageSections } from "./trustPageGenerator";
import { createTrustFindings } from "./trustRules";
import { calculateTrustScore } from "./trustScore";
import { createTrustTasks } from "./trustTasks";

export function buildTrustReport(input: TrustProfile): TrustReport {
  const profile = normalizeProfile(input);
  const findings = createTrustFindings(profile);
  const score = calculateTrustScore(profile);
  const tasks = createTrustTasks(findings);
  const trustPageSections = generateTrustPageSections(profile, findings);
  const markdown = generateMarkdownReport(profile, score, findings, tasks, trustPageSections);

  return {
    profile,
    findings,
    score,
    tasks,
    trustPageSections,
    markdown
  };
}
