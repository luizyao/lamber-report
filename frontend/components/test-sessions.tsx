import { Table } from "antd";
import type { TableProps } from "antd";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { humanFormatDuration, integerToIpaddress } from "@/lib/utils";
import type { TestSession } from "@/lib/data-provider";

export default function TestSessions({
  testSessions,
  projectName,
  projectId,
}: {
  testSessions: TestSession[];
  projectName: string;
  projectId: string;
}) {
  const columns: TableProps<TestSession>["columns"] = [
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (_, record) => (
        <Link
          href={{
            pathname: "/test_session",
            query: {
              projectId: projectId,
              projectName: projectName,
              testSessionId: record.uuid,
              testSessionStartTime: record.start_time,
            },
          }}
        >
          {new Date(record.start_time * 1000).toLocaleString("zh-CN")}
        </Link>
      ),
    },
    {
      title: "Host",
      dataIndex: "host_ip",
      key: "host_ip",
      render: (value) => integerToIpaddress(value),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (value) =>
        value ? humanFormatDuration(value) : <LoadingOutlined />,
    },
  ];

  return (
    <Table<TestSession>
      pagination={{ hideOnSinglePage: true }}
      rowKey="uuid"
      columns={columns}
      dataSource={testSessions}
    />
  );
}
