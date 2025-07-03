import { useTestSessionEnvironment } from "@/lib/data-provider";
import { Descriptions, type DescriptionsProps, Divider } from "antd";

export default function TestSessionEnvironment({
  testSessionId,
}: {
  testSessionId: string;
}) {
  const { testSessionEnvironment, isLoading } =
    useTestSessionEnvironment(testSessionId);

  if (isLoading) return <div>Loading...</div>;

  const items: DescriptionsProps["items"] = [];

  if (testSessionEnvironment.environment) {
    Object.entries(
      JSON.parse(testSessionEnvironment.environment) as Record<string, string>,
    ).forEach(([key, value]) => {
      items.push({
        key: key,
        label: key,
        children: value,
      });
    });
  }

  return (
    <>
      <Divider orientation="left">Environment</Divider>
      <Descriptions
        items={items}
        styles={{ content: { textAlign: "left" } }}
        bordered
      />
    </>
  );
}
