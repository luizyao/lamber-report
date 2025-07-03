import { Breadcrumb } from "antd";
import Link from "next/link";
import {
  FolderOpenOutlined,
  HomeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import TestSessionEnvironment from "@/components/test-session-environment";
import TestSessionStatistic from "@/components/test-session-statistic";
import TestSessionTestcases from "@/components/test-session-testcases";

export default function Page() {
  const router = useRouter();

  const projectId = router.query.projectId as string;
  const projectName = router.query.projectName as string;
  const testSessionId = router.query.testSessionId as string;
  const testSessionStartTime = router.query.testSessionStartTime as string;

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
                <span>
                  {new Date(
                    parseFloat(testSessionStartTime) * 1000,
                  ).toLocaleString("zh-CN")}
                </span>
              </>
            ),
          },
        ]}
      />

      <TestSessionEnvironment testSessionId={testSessionId} />
      <TestSessionStatistic testSessionId={testSessionId} />
      <TestSessionTestcases
        testSessionId={testSessionId}
        projectName={projectName}
        projectId={projectId}
      />
    </>
  );
}
