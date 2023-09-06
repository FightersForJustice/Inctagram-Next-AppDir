export const useParamsCustomHook = (params: string[]) => {
  let allParams: string[] = [];
  params.map((p) => {
    if (p.length) {
      const qString = window.location.search;
      const urlParam = new URLSearchParams(qString);
      allParams.push(urlParam.get(p) ?? "");
    }
  });

  return allParams;
};
