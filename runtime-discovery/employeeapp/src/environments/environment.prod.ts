export const environment = {
  system: 'prod',
  version: 'jenkinsBuildNO',
  appVersion: require('../../package.json').version,
  production: true,
  // for fake backend:
  apiUrl: 'http://localhost:4000',
  // for Real backend:
  // apiUrl: 'http://localhost:2020',
};
