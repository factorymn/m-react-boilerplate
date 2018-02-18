import qs               from 'query-string';
import request          from 'axios';

export default (params) => {
  const method = params.method;
  const apiHost = 'http://localhost:3223';

  const query = params.query ? `?${ qs.stringify(params.query) }` : '';

  const url = `${ params.host || apiHost }${ params.path }${ query }`;
  const responseType = 'json';

  const requestParams = { method, url, responseType };

  if (params.data) requestParams.data = params.data;

  return request(requestParams);
};
