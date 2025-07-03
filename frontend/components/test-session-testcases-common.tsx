import { TestSessionTestcase } from "@/lib/data-provider";
import { getResultColor, humanFormatDuration } from "@/lib/utils";
import {
  LoadingOutlined,
  LockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  type TableColumnType,
  type InputRef,
  type TableColumnsType,
  Input,
  Space,
  Button,
  Tag,
  Table,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import Link from "next/link";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import SyntaxHighlighter from "react-syntax-highlighter";

type DataIndex = keyof TestSessionTestcase;

type Marker = {
  name: string;
};

export default function TestSessionTestcasesCommon({
  testSessionId,
  testSessionTestcases,
  projectName,
  projectId,
}: {
  testSessionId: string;
  testSessionTestcases: TestSessionTestcase[];
  projectName: string;
  projectId: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): TableColumnType<TestSessionTestcase> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record
        ? record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes((value as string).toLowerCase())
          : false
        : false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<TestSessionTestcase> = [
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (_, record) =>
        record.result ? (
          <Tag color={getResultColor(record.result)}>{record.result}</Tag>
        ) : record.start_time ? (
          <LoadingOutlined />
        ) : (
          <LockOutlined />
        ),
      filters: [
        {
          text: "PASS",
          value: "PASS",
        },
        {
          text: "FAIL",
          value: "FAIL",
        },
        {
          text: "ERROR",
          value: "ERROR",
        },
        {
          text: "XPASS",
          value: "XPASS",
        },
        {
          text: "XFAIL",
          value: "XFAIL",
        },
        {
          text: "ABORT",
          value: "ABORT",
        },
        {
          text: "SKIP",
          value: "SKIP",
        },
      ],
      onFilter: (value, record) =>
        record.result ? record.result.indexOf(value as string) === 0 : false,
      width: "8px",
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (_, record) =>
        record.start_time ? (
          <Link
            href={{
              pathname: "/testcase",
              query: {
                projectId: projectId,
                projectName: projectName,
                testSessionId: testSessionId,
                testSessionStartTime: record.start_time.toString(),
                testcaseId: record.uuid,
                testcaseNodeid: record.nodeid,
              },
            }}
          >
            {new Date(record.start_time * 1000).toLocaleString("zh-CN")}
          </Link>
        ) : (
          ""
        ),
      sorter: (a, b) => a.start_time - b.start_time,
      sortDirections: ["descend", "ascend"],
      width: "220px",
    },
    {
      title: "Name",
      dataIndex: "nodeid",
      key: "nodeid",
      ...getColumnSearchProps("nodeid"),
    },
    {
      title: "Marker",
      dataIndex: "marker",
      key: "marker",
      ...getColumnSearchProps("marker"),
      render: (value) =>
        value ? (
          <Space>
            {(JSON.parse(value) as Marker[]).map((item) =>
              item.name == "parametrize" ? (
                ""
              ) : (
                <Tag key={item.name} color="processing">
                  {item.name}
                </Tag>
              ),
            )}
          </Space>
        ) : (
          ""
        ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (value) => (value ? humanFormatDuration(value) : ""),
      sorter: (a, b) => a.duration - b.duration,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <Table<TestSessionTestcase>
      pagination={{ hideOnSinglePage: true }}
      rowKey="uuid"
      columns={columns}
      dataSource={testSessionTestcases}
      expandable={{
        expandedRowRender: (record) =>
          record.result_detail ? (
            <SyntaxHighlighter language="python">
              {(JSON.parse(record.result_detail) as string[]).join("\n\n")}
            </SyntaxHighlighter>
          ) : (
            <></>
          ),
        rowExpandable: (record) => record.result_detail !== null,
      }}
    />
  );
}
