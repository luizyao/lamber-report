import { Breadcrumb, Divider, Space, Splitter } from "antd";
import Link from "next/link";
import {
  FileDoneOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import TestcaseLanding from "@/components/testcase-landing";
import TestcaseExplorer from "@/components/testcase-explorer";
import TestcaseSourcecode from "@/components/testcase-sourcecode";
import TestcaseHelper from "@/components/testcase-helper";

export default function Page() {
  const router = useRouter();

  const projectId = router.query.projectId as string;
  const projectName = router.query.projectName as string;
  const testSessionId = router.query.testSessionId as string;
  const testSessionStartTime = router.query.testSessionStartTime as string;
  const testcaseId = router.query.testcaseId as string;
  const testcaseNodeid = router.query.testcaseNodeid as string;

  return (
    <>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <Link href="/">Home</Link>
              </>
            ),
          },
          {
            title: (
              <>
                <ProjectOutlined />
                <Link
                  href={{
                    pathname: "/project",
                    query: {
                      projectId: projectId,
                      projectName: projectName,
                    },
                  }}
                >
                  {projectName}
                </Link>
              </>
            ),
          },
          {
            title: (
              <>
                <FolderOpenOutlined />
                <Link
                  href={{
                    pathname: "/test_session",
                    query: {
                      projectId: projectId,
                      projectName: projectName,
                      testSessionId: testSessionId,
                      testSessionStartTime: testSessionStartTime,
                    },
                  }}
                >
                  {new Date(
                    parseFloat(testSessionStartTime) * 1000,
                  ).toLocaleString("zh-CN")}
                </Link>
              </>
            ),
          },
          {
            title: (
              <>
                <FileDoneOutlined />
                <span>{testcaseNodeid}</span>
              </>
            ),
          },
        ]}
      />
      <Divider />
      <Space direction="vertical" style={{ display: "flex" }}>
        <TestcaseLanding testcaseId={testcaseId} />

        <Splitter style={{ height: "calc(100vh - 220px)" }}>
          <Splitter.Panel
            defaultSize="30%"
            collapsible
            style={{ marginRight: "8px" }}
          >
            <TestcaseExplorer testcaseId={testcaseId} />
          </Splitter.Panel>
          <Splitter.Panel collapsible style={{ marginLeft: "8px" }}>
            <Splitter layout="vertical">
              <Splitter.Panel>
                <TestcaseSourcecode testcaseId={testcaseId} />
              </Splitter.Panel>
              <Splitter.Panel style={{ marginTop: "8px" }}>
                <TestcaseHelper
                  testcaseId={testcaseId}
                  testSessionId={testSessionId}
                  projectName={projectName}
                  projectId={projectId}
                />
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      </Space>
    </>
  );
}
