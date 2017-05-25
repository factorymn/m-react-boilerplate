import UserAgentParser from 'ua-parser-js';

export default function isSupportedBrowser(userAgentString, options) {
  const parsedUserAgent = new UserAgentParser(userAgentString).getResult();
  const browserName = parsedUserAgent.browser.name;
  const browserMajorVersion = parsedUserAgent.browser.major;
  let isSupported = true;

  if (options[browserName] && browserMajorVersion < options[browserName]) {
    isSupported = false;
  }

  return isSupported;
}
