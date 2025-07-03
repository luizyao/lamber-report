import { useTestSessionTestcases } from "@/lib/data-provider";
import TestSessionTestcasesCommon from "./test-session-testcases-common";
import { Divider } from "antd";

export default function TestSessionTestcases({
  testSessionId,
  projectName,
  projectId,
}: {
  testSessionId: string;
  projectName: string;
  projectId: string;
}) {
  const { testSessionTestcases, isLoading } =
    useTestSessionTestcases(testSessionId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Divider orientation="left">Testcases</Divider>
      <TestSessionTestcasesCommon
        testSessionId={testSessionId}
        testSessionTestcases={testSessionTestcases}
        projectName={projectName}
        projectId={projectId}
      />
    </>
  );
}
