import { useTestcaseSourcecode } from "@/lib/data-provider";
import { Tabs } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function TestcaseSourcecode({
  testcaseId,
}: {
  testcaseId: string;
}) {
  const { testresultSourcecode, isLoading } = useTestcaseSourcecode(testcaseId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Tabs
      style={{ textAlign: "left" }}
      items={[
        {
          key: "1",
          label: "Sourcecode",
          children: (
            <SyntaxHighlighter language="python">
              {testresultSourcecode.sourcecode}
            </SyntaxHighlighter>
          ),
        },
      ]}
    />
  );
}
