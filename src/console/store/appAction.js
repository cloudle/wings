import * as Actions from './actions';

export function increaseCounter(volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}

export function toggleDevStatus(payload) {
	return { type: Actions.ToggleDevStatus, payload, };
}

export function setDevMessage(payload) {
	return { type: Actions.SetDevMessage, payload, };
}

export function toggleNodeStatus(payload) {
	return { type: Actions.ToggleNodeStatus, payload, };
}

export function setNodeMessage(payload) {
	return { type: Actions.SetNodeMessage, payload, };
}

export function setDevStats(payload) {
	return { type: Actions.SetDevStats, payload, };
}
