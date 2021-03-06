export let counter = 0;

export const increaseCounter = (root, { amount, }, context) => {
	counter += 1;
	return counter;
};
