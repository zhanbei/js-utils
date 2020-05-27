//

const params = new URLSearchParams(window.location.search);
export const getUrlSearchParams = () => params;

export const hasUrlSearchParam = (key: string): boolean => params.has(key);
export const getUrlSearchParam = (key: string): string | null => params.get(key);

export const UrlSearchParamUtil = {
	getParams: getUrlSearchParams,

	hasParam: hasUrlSearchParam,
	getParam: getUrlSearchParam,
};