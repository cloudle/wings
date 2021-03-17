import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const runSagas = () => [

].forEach(item => sagaMiddleware.run(item));

export default sagaMiddleware;
