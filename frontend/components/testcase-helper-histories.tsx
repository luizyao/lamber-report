import { useTestcaseHistories } from "@/lib/data-provider";
import TestSessionTestcasesCommon from "./test-session-testcases-common";

export default function TestcaseHelperHistories({
  testcaseId,
  testSessionId,
  projectName,
  projectId,
}: {
  testcaseId: string;
  testSessionId: string;
  projectName: string;
  projectId: string;
}) {
  const { testSessionTestcases, isLoading } = useTestcaseHistories(testcaseId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <TestSessionTestcasesCommon
      testSessionId={testSessionId}
      testSessionTestcases={testSessionTestcases}
      projectName={projectName}
      projectId={projectId}
    />
  );
}
