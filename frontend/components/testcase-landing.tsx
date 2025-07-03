import { Descriptions, Space, Tag, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getResultColor, humanFormatDuration } from "@/lib/utils";
import { useTestcaseLanding } from "@/lib/data-provider";

const { Title } = Typography;

type Marker = {
  name: string;
};

export default function TestcaseLanding({
  testcaseId,
}: {
  testcaseId: string;
}) {
  const { testcaseLanding, isLoading } = useTestcaseLanding(testcaseId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Space direction="vertical" style={{ display: "flex" }} size="small">
      <Space size="small" style={{ display: "flex" }}>
        {testcaseLanding.result ? (
          <Tag color={getResultColor(testcaseLanding.result)}>
            {testcaseLanding.result}
          </Tag>
        ) : (
          <LoadingOutlined />
        )}
        <Title copyable level={4} style={{ margin: 0 }}>
          {testcaseLanding.nodeid}
        </Title>
        <Tag color="processing">
          {humanFormatDuration(testcaseLanding.duration)}
        </Tag>
        {testcaseLanding.marker ? (
          (JSON.parse(testcaseLanding.marker) as Marker[]).map((item) =>
            item.name == "parametrize" ? (
              ""
            ) : (
              <Tag key={item.name} color="processing">
                {item.name}
              </Tag>
            ),
          )
        ) : (
          <></>
        )}
      </Space>
      <Descriptions
        items={[
          {
            key: "1",
            label: "Start Time",
            children: new Date(
              testcaseLanding.start_time * 1000,
            ).toLocaleString("zh-CN"),
          },
          {
            key: "2",
            label: "Stop Time",
            children: testcaseLanding.stop_time ? (
              new Date(testcaseLanding.stop_time * 1000).toLocaleString("zh-CN")
            ) : (
              <></>
            ),
          },
        ]}
      ></Descriptions>
    </Space>
  );
}
