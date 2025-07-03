import { useTestSessionResultStatistic } from "@/lib/data-provider";
import { getResultColor, humanFormatDuration } from "@/lib/utils";
import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Spin,
  Statistic,
  Typography,
} from "antd";

const { Text } = Typography;

export default function TestSessionStatistic({
  testSessionId,
}: {
  testSessionId: string;
}) {
  const { testSessionResultStatistic, isLoading } =
    useTestSessionResultStatistic(testSessionId);

  if (isLoading) return <div>Loading...</div>;

  let totalCount: number = 0;
  let nullCount: number = 0;

  testSessionResultStatistic.statistics.map((item) => {
    if (nullCount == 0 && item.result === null) {
      nullCount = item.count;
    }
    totalCount += item.count;
  });

  const landingIcon = testSessionResultStatistic.duration ? (
    <CheckCircleTwoTone twoToneColor={getResultColor("PASS")} />
  ) : (
    <Spin size="small" />
  );
  const landingPrompt = testSessionResultStatistic.duration ? (
    <>
      <Text>
        Executed <Text strong>{totalCount}</Text> testcases, starting on{" "}
        <Text underline italic strong>
          {new Date(
            testSessionResultStatistic.start_time * 1000,
          ).toLocaleString("zh-CN")}
        </Text>{" "}
        and ending on{" "}
        <Text underline italic strong>
          {new Date(testSessionResultStatistic.stop_time * 1000).toLocaleString(
            "zh-CN",
          )}
        </Text>
        , with a time of{" "}
        <Text underline italic strong>
          {humanFormatDuration(testSessionResultStatistic.duration)}
        </Text>
        .
      </Text>
    </>
  ) : (
    <Text>
      Executing <Text strong>{totalCount}</Text> testcases, starting on{" "}
      <Text underline italic strong>
        {new Date(testSessionResultStatistic.start_time * 1000).toLocaleString(
          "zh-CN",
        )}
      </Text>
      , has spent{" "}
      <Text underline italic strong>
        {humanFormatDuration(
          Date.now() / 1000 - testSessionResultStatistic.start_time,
        )}
      </Text>
      .
    </Text>
  );

  const landingPromptSuffix =
    testSessionResultStatistic.duration && nullCount ? (
      <Text mark>
        Aborted <Text strong>{nullCount}</Text> testcases.
      </Text>
    ) : (
      <></>
    );

  const landingProgress = nullCount ? (
    <Progress percent={((totalCount - nullCount) / totalCount) * 100} />
  ) : (
    <></>
  );

  return (
    <>
      <Divider orientation="left">Statistic</Divider>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Space style={{ display: "flex" }}>
          {landingIcon}
          {landingPrompt}
          {landingPromptSuffix}
        </Space>
        {landingProgress}

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {testSessionResultStatistic.statistics.map((item) => (
            <Col span={3} key={item.result}>
              <Card>
                <Statistic
                  title={`${item.result ? item.result : "TODO"}(${item.count})`}
                  value={(item.count / totalCount) * 100}
                  precision={2}
                  valueStyle={{ color: getResultColor(item.result) }}
                  suffix="%"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
}
