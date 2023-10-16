export function findMatchingString(input: string): string | undefined {
  if (input === undefined) return "/img/settings-profile/web.png";
  const stringArray: MatchingBrowser[] = ["chrome", "safari", "firefox", "explorer", "opera", "none"];

  const cleanedInput = input.toLowerCase().replace(/\s/g, "");

  let matchingString = stringArray.find((str) => cleanedInput.includes(str));

  const imagesArr = {
    chrome: "/img/settings-profile/chrome.svg",
    safari: "/img/settings-profile/safari.svg",
    firefox: "/img/settings-profile/firefox.png",
    explorer: "/img/settings-profile/explorer.png",
    opera: "/img/settings-profile/opera.svg",
    none: "/img/settings-profile/web.png",
  };

  return imagesArr[matchingString ?? "none"];
}

type MatchingBrowser = "chrome" | "safari" | "firefox" | "explorer" | "opera" | "none";
