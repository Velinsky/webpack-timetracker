import {readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';
import {unless} from 'ramda';

import {pluginDerivedOptions, pluginOptions} from "./main";

const createIfNotExists = (cwd) => (path) => {
	return unless(
		existsSync,
		mkdirSync
	)(join(cwd, path))
};

export default class Writer {
	private options: pluginOptions;
	private derivedOptions: pluginDerivedOptions;

	constructor(cfg: pluginOptions, derivedCfg: pluginDerivedOptions) {
		this.options = cfg;
		this.derivedOptions = derivedCfg;

		// check structure
		let createLocal = createIfNotExists(this.derivedOptions.cwd);

		createLocal('.webpacktime');
	}

	writeActivity() {

	}
}
