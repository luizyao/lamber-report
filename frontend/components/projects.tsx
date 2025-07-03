import { useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { useProjects } from "@/lib/data-provider";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Link from "next/link";

import type { Project } from "@/lib/data-provider";
import type { InputRef, TableColumnType, TableProps } from "antd";

type DataIndex = keyof Project;

export default function Projects() {
  const { projects, isLoading } = useProjects();

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
  ): TableColumnType<Project> => ({
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
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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

  const columns: TableProps<Project>["columns"] = [
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      ...getColumnSearchProps("project_name"),
      render: (_, record) => (
        <Link
          href={{
            pathname: "/project",
            query: { projectId: record.id, projectName: record.project_name },
          }}
        >
          {record.project_name}
        </Link>
      ),
    },
    {
      title: "Create Time",
      dataIndex: "create_time",
      key: "create_time",
      render: (value) => new Date(value * 1000).toLocaleString("zh-CN"),
    },
    {
      title: "Last Run Time",
      dataIndex: "last_run_time",
      key: "last_run_time",
      render: (value) => new Date(value * 1000).toLocaleString("zh-CN"),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table<Project>
      pagination={{ hideOnSinglePage: true }}
      rowKey="id"
      columns={columns}
      dataSource={projects}
    />
  );
}
