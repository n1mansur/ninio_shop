
export const numberWithSpaces = (x) => {
	if(!x) return 0
	if(isNaN(Number(x))) return 0

	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
}

export const formatMoney = ( x ) => {
	if(!x) return 0
	if(isNaN(Number(x))) return 0

	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return parts.join(".");
}

export const formatIntMoney = (number) => {
	if(!number) return '-'
	if(isNaN(Number(number))) return 0

	let str = parseInt(number).toString()
	str = str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	return str;
}
