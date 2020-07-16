import * as Actions from './actions';

export function increaseCounter(volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}

export function toggleDevStatus(payload: Boolean) {
	return { type: Actions.ToggleDevStatus, payload, };
}

export function setDevMessage(payload) {
	return { type: Actions.SetDevMessage, payload, };
}

export function toggleNodeStatus(payload: Boolean) {
	return { type: Actions.ToggleNodeStatus, payload, };
}

export function setNodeMessage(payload) {
	return { type: Actions.SetNodeMessage, payload, };
}

export function setNodeAddress(payload) {
	return { type: Actions.SetNodeAddress, payload, };
}

export function setDevStats(payload) {
	return { type: Actions.SetDevStats, payload, };
}

export function setDevAddress(payload) {
	return { type: Actions.SetDevAddress, payload, };
}

export function setDevProgress(payload) {
	return { type: Actions.SetDevProgress, payload, };
}
