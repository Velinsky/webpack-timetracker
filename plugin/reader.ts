import {PluginDerivedOptions, PluginOptions} from "./main";

export default class Reader {
	private options: PluginOptions;
	private derivedOptions: PluginDerivedOptions;

	constructor(cfg: PluginOptions, derivedCfg: PluginDerivedOptions) {
		this.options = cfg;
		this.derivedOptions = derivedCfg;
	}

	readActivity() {

	}
}
