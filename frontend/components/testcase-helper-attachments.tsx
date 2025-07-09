import { useTestcaseAttachments } from "@/lib/data-provider";
import { List, Typography } from "antd";

export default function TestcaseHelperAttachments({
  testcaseId,
}: {
  testcaseId: string;
}) {
  const { testcaseAttachments, isLoading } = useTestcaseAttachments(testcaseId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <List
      itemLayout="horizontal"
      dataSource={testcaseAttachments}
      renderItem={(item) => (
        <List.Item key={item.uuid}>
          <List.Item.Meta
            title={
              <>
                [
                <Typography.Text mark>
                  {(JSON.parse(item.content_type) as string[])[1].toUpperCase()}
                </Typography.Text>
                ]{" "}
                <a
                  href={`attachments/${item.uuid}.${
                    (JSON.parse(item.content_type) as string[])[1]
                  }`}
                >
                  {item.name}
                </a>
              </>
            }
            description={
              <Typography.Text italic>
                {new Date(item.create_time * 1000).toLocaleString("zh-CN")}
              </Typography.Text>
            }
          />
        </List.Item>
      )}
    />
  );
}
