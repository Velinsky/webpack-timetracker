import {pluginDerivedOptions, pluginOptions} from "./main";

export default class Reader {
	private options: pluginOptions;
	private derivedOptions: pluginDerivedOptions;

	constructor(cfg: pluginOptions, derivedCfg: pluginDerivedOptions) {
		this.options = cfg;
		this.derivedOptions = derivedCfg;
	}

	readActivity() {

	}
}
