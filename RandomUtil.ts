//

const AVAILABLE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (len: number): string =>
	new Array(len).fill(0).map(item => AVAILABLE_CHARACTERS.charAt(Math.floor(Math.random() * AVAILABLE_CHARACTERS.length))).join('');
