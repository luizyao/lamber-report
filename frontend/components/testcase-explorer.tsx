import { LoadingOutlined } from "@ant-design/icons";
import { Collapse, Empty, Space, Tag, Tree } from "antd";
import { getResultColor } from "@/lib/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useTestcaseExplorer } from "@/lib/data-provider";

export default function TestcaseExplorer({
  testcaseId,
}: {
  testcaseId: string;
}) {
  const { testcaseExplorer, isLoading } = useTestcaseExplorer(testcaseId);

  if (isLoading) return <div>Loading...</div>;
  console.log(testcaseExplorer);
  return (
    <Collapse
      size="small"
      style={{ textAlign: "left" }}
      defaultActiveKey={testcaseExplorer.traceback ? ["1", "2"] : ["1"]}
      items={[
        {
          key: "1",
          label: "Step Tree",
          children: (
            <Tree
              defaultExpandAll
              treeData={testcaseExplorer.steps}
              titleRender={(node) => (
                <Space size="small">
                  {node.result ? (
                    <Tag bordered={false} color={getResultColor(node.result)}>
                      {node.result}
                    </Tag>
                  ) : (
                    <LoadingOutlined />
                  )}
                  {node.title}
                  {node.scope ? <Tag color="success">{node.scope}</Tag> : <></>}
                  {
                    <Tag color="processing">
                      {new Date(node.start_time * 1000).toLocaleString("zh-CN")}
                    </Tag>
                  }
                </Space>
              )}
            />
          ),
        },
        {
          key: "2",
          label: "Traceback",
          children: testcaseExplorer.traceback ? (
            <SyntaxHighlighter
              language="python"
              customStyle={{
                textAlign: "left",
              }}
            >
              {(JSON.parse(testcaseExplorer.traceback) as string[]).join(
                "\n\n",
              )}
            </SyntaxHighlighter>
          ) : (
            <Empty />
          ),
        },
      ]}
    />
  );
}
