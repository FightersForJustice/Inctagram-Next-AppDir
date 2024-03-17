export function findDevice(sessions: any, userAgentArray: any) {
  return sessions.find(
    (item: any) =>
      item.browserName === userAgentArray.browser.name &&
      item.browserVersion === userAgentArray.browser.version &&
      item.osName === userAgentArray.os.name &&
      item.osVersion === userAgentArray.os.version
  );
}
