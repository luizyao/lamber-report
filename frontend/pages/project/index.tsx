import { Breadcrumb, Divider } from "antd";
import Link from "next/link";
import { HomeOutlined, ProjectOutlined } from "@ant-design/icons";
import { useTestSessions } from "@/lib/data-provider";
import { useRouter } from "next/router";
import TestSessions from "@/components/test-sessions";

export default function Page() {
  const router = useRouter();

  const projectId = router.query.projectId as string;
  const projectName = router.query.projectName as string;

  const { testSessions, isLoading } = useTestSessions(projectId);

  if (isLoading) return <div>Loading...</div>;

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
                <span>{projectName}</span>
              </>
            ),
          },
        ]}
      />
      <Divider />
      <TestSessions
        testSessions={testSessions}
        projectName={projectName}
        projectId={projectId}
      />
    </>
  );
}
