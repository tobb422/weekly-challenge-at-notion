import { Response, User } from '../apiClient';

import { compose, groupBy, keys, prop, sortBy, toLower } from 'ramda';

type Chart = {
  user: User;
  data: {
    key: string;
    title: string;
    period: {
      start: string | null;
      end: string | null;
    } | null;
    progress: number;
  }[]
}

const unknownPersonKey = '-';

const buildCharts: (res: Response) => Chart[] = (res) => {
  const resGroupByUser = groupBy((res) => {
    const { people } = res.properties.person;
    return people.length > 0 ? people[0].name ?? unknownPersonKey : unknownPersonKey;
  }, res.results);
  const chartKeys = keys(resGroupByUser);
      
  return chartKeys
    .filter((key) => key !== unknownPersonKey)
    .map((key) => {
      const values = resGroupByUser[key];
          
      return {
        user: values[0].properties.person.people[0],
        data: sortBy(
          compose(toLower, prop('createdTime')),
          values
        ).map((value) => ({
          key: value.id,
          title: value.properties.goal.title[0].plainText,
          period: value.properties.period.date,
          progress: value.properties.progress.number ?? 0,
        }))
      }
    });
}

export { buildCharts }
