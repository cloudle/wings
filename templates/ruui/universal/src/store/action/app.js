import * as Actions from 'store/actions';

export function increaseCounter(volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}
