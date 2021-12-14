import { validator, Response, User } from './types';

import fetch from 'node-fetch';
import humps from 'humps';

const fetchWeeklyChallengeLogs: () => Promise<Response | null> = () => {
  return fetch(
    'https://api.notion.com/v1/databases/8730655fa7424de691e157821c789dd2/query',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer',
        'Notion-Version': '2021-08-16',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
  ).then(async (res) => {
    const r = await res.json();
  
    if (typeof r === 'object' && r !== null) {
      const data = humps.camelizeKeys(humps.depascalizeKeys(r))
      return validator(data) ? data : null;
    }
  
    return null;
  }); 
}

export { fetchWeeklyChallengeLogs, Response, User };
