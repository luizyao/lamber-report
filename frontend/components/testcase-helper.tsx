import { Empty, Tabs } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTestcasePytestLogs } from "@/lib/data-provider";
import TestcaseHelperHistories from "./testcase-helper-histories";
import TestcaseHelperAttachments from "./testcase-helper-attachments";

export default function TestcaseHelper({
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
  const { testcasePytestLogs, isLoading } = useTestcasePytestLogs(testcaseId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Tabs
      style={{ textAlign: "left" }}
      items={[
        {
          key: "1",
          label: "Caplog",
          children: testcasePytestLogs.caplog ? (
            <SyntaxHighlighter language="bash">
              {testcasePytestLogs.caplog}
            </SyntaxHighlighter>
          ) : (
            <Empty />
          ),
        },
        {
          key: "2",
          label: "Capstderr",
          children: testcasePytestLogs.capstderr ? (
            <SyntaxHighlighter language="bash">
              {testcasePytestLogs.capstderr}
            </SyntaxHighlighter>
          ) : (
            <Empty />
          ),
        },
        {
          key: "3",
          label: "Capstdout",
          children: testcasePytestLogs.capstdout ? (
            <SyntaxHighlighter language="bash">
              {testcasePytestLogs.capstdout}
            </SyntaxHighlighter>
          ) : (
            <Empty />
          ),
        },
        {
          key: "4",
          label: "Attachments",
          children: <TestcaseHelperAttachments testcaseId={testcaseId} />,
        },
        {
          key: "5",
          label: "Histories",
          children: (
            <TestcaseHelperHistories
              testcaseId={testcaseId}
              testSessionId={testSessionId}
              projectName={projectName}
              projectId={projectId}
            />
          ),
        },
      ]}
    />
  );
}
