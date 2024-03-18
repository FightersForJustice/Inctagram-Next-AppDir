import { DevicesResponse } from '@/api/profile.api';

export function otherDeviceFilter(
  stateSessions: DevicesResponse[],
  userAgentArray: UAParser.IResult
) {
  if (stateSessions) {
    return stateSessions.filter(
      (item: DevicesResponse) =>
        item.browserName !== userAgentArray.browser.name ||
        item.browserVersion !== userAgentArray.browser.version ||
        item.osName !== userAgentArray.os.name ||
        item.osVersion !== userAgentArray.os.version
    );
  }
}
