import { fetchWeeklyChallengeLogs } from './src/apiClient';
import { buildCharts } from './src/logic';

fetchWeeklyChallengeLogs().then((res) =>
  res === null ? [] : buildCharts(res)
);
