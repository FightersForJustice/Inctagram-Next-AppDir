import { DevicesResponse } from '@/api/profile.api';

export function findDevice(
  sessions: DevicesResponse[],
  userAgentArray: UAParser.IResult
) {
  if (sessions) {
    return sessions.find(
      (item: DevicesResponse) =>
        item.browserName === userAgentArray.browser.name &&
        item.browserVersion === userAgentArray.browser.version &&
        item.osName === userAgentArray.os.name &&
        item.osVersion === userAgentArray.os.version
    );
  }
}
