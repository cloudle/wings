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

export function setNodeHotUpdate(payload) {
	return { type: Actions.SetNodeHotUpdate, payload, };
}

export function setNodeAddress(payload) {
	return { type: Actions.SetNodeAddress, payload, };
}

export function insertNodeConsole(payload) {
	return { type: Actions.InsertNodeConsole, payload, };
}

export function clearNodeConsole() {
	return { type: Actions.ClearNodeConsole, };
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

export function insertDevConsole(payload) {
	return { type: Actions.InsertDevConsole, payload, };
}

export function clearDevConsole() {
	return { type: Actions.ClearDevConsole, };
}
