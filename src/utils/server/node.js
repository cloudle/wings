import { extractGlobalModules, } from '../modules';
import { configure } from '../../../playground/index.node';

const globalModules = extractGlobalModules();
const { wingsConfig, wingsHelper, webpack, express, } = globalModules;
const { requireModule, } = wingsHelper;
const env = wingsConfig.env();
const isProduction = wingsConfig.isProduction(env);
const staticPath = wingsConfig.staticPath(env);
const host = wingsConfig.host();
const port = wingsConfig.ssrPort();
const server = express();
const nodeEntry = requireModule('index.node.js');
const defaultServerConfigure = () => new Promise((resolve, reject) => resolve());
const serverConfigure = nodeEntry.configure || defaultServerConfigure;

server.set('view engine', 'ejs');
server.use(express.static(staticPath));

serverConfigure(server).then(() => {
	server.listen(port, host, () => {
		console.log('server is ready!');
	});
});