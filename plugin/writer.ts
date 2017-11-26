import {readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';
import {unless, memoize} from 'ramda';

import {PluginDerivedOptions, PluginOptions} from "./main";

const createIfNotExists = (cwd) => (path) => unless(
	existsSync,
	mkdirSync
)(join(cwd, path));

export default class Writer {
	private options: PluginOptions;
	private derivedOptions: PluginDerivedOptions;

	constructor(cfg: PluginOptions, derivedCfg: PluginDerivedOptions) {
		this.options = cfg;
		this.derivedOptions = derivedCfg;

		// check structure
		let createLocal = createIfNotExists(this.derivedOptions.cwd);


		createLocal(this.options.directoryName);
	}

	writeActivity() {

	}
}
