//

const removeItem = (array: any[], item: any): any[] => {
	const index = array.indexOf(item);
	if (index > -1) {array.splice(index, 1);}
	return array;
};

export const ArrayUtil = {
	removeItem,
};