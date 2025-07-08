import useSWR from "swr";

// @ts-expect-error ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export type Project = {
  id: number;
  project_name: string;
  create_time: number;
  last_run_time: number;
};

export function useProjects() {
  const { data, error, isLoading } = useSWR(`/api/projects`, fetcher);

  return {
    projects: data as Project[],
    isLoading,
    isError: error,
  };
}

export type TestSession = {
  uuid: string;
  start_time: number;
  host_ip: number;
  duration: number | null;
};

export function useTestSessions(projectId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/project/test_sessions?project_id=${projectId}`,
    fetcher
  );

  return {
    testSessions: data as TestSession[],
    isLoading,
    isError: error,
  };
}

type TestSessionEnvironment = {
  environment: string;
};

export function useTestSessionEnvironment(testSessionId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/test_session/environment?test_session_id=${testSessionId}`,
    fetcher
  );

  return {
    testSessionEnvironment: data as TestSessionEnvironment,
    isLoading,
    isError: error,
  };
}

type ResultStatistic = {
  result: string;
  count: number;
};

type TestSessionResultStatistic = {
  start_time: number;
  stop_time: number;
  duration: number | null;
  statistics: ResultStatistic[];
};

export function useTestSessionResultStatistic(testSessionId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/test_session/result_statistic?test_session_id=${testSessionId}`,
    fetcher
  );

  return {
    testSessionResultStatistic: data as TestSessionResultStatistic,
    isLoading,
    isError: error,
  };
}

export type TestSessionTestcase = {
  uuid: string;
  nodeid: string;
  start_time: number;
  marker: string;
  duration: number;
  result: string;
  result_detail: string;
};

export function useTestSessionTestcases(testSessionId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/test_session/testcases?test_session_id=${testSessionId}`,
    fetcher
  );

  return {
    testSessionTestcases: data as TestSessionTestcase[],
    isLoading,
    isError: error,
  };
}

type TestcaseLanding = {
  uuid: string;
  start_time: number;
  stop_time: number;
  nodeid: string;
  marker: string;
  result: string;
  duration: number;
};

export function useTestcaseLanding(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/landing?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testcaseLanding: data as TestcaseLanding,
    isLoading,
    isError: error,
  };
}

type TestcaseStep = {
  key: string;
  title: string;
  when_: string;
  scope: string | null;
  result: string | null;
  start_time: number;
  stop_time: number | null;
  duration: number | null;
  children: TestcaseStep[];
};

type TestcaseExplorer = {
  steps: TestcaseStep[];
  traceback: string | null;
};

export function useTestcaseExplorer(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/explorer?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testcaseExplorer: data as TestcaseExplorer,
    isLoading,
    isError: error,
  };
}

type TestresultSourcecode = {
  uuid: string;
  sourcecode: string;
};

export function useTestcaseSourcecode(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/sourcecode?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testresultSourcecode: data as TestresultSourcecode,
    isLoading,
    isError: error,
  };
}

export function useTestcaseHistories(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/histories?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testSessionTestcases: data as TestSessionTestcase[],
    isLoading,
    isError: error,
  };
}

type TestcasePytestLogs = {
  caplog: string;
  capstderr: string;
  capstdout: string;
};

export function useTestcasePytestLogs(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/pytest_logs?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testcasePytestLogs: data as TestcasePytestLogs,
    isLoading,
    isError: error,
  };
}

type testcaseAttachment = {
  uuid: string;
  name: string;
  content_type: string;
  create_time: number;
};

export function useTestcaseAttachments(testcaseId: string) {
  const { data, error, isLoading } = useSWR(
    `/api/testcase/attachments?testcase_id=${testcaseId}`,
    fetcher
  );

  return {
    testcaseAttachments: data as testcaseAttachment[],
    isLoading,
    isError: error,
  };
}
