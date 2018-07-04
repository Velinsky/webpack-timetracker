import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { unless, memoize } from 'ramda';
import * as fs from 'fs';

import { PluginDerivedOptions, PluginOptions } from './main';

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

	writeActivity(filenames: string[] = []) {

		filenames = filenames
			// save only relative paths
			.map((file) => file.replace(this.derivedOptions.cwd, ''))
			// surround with ", in case theres a dash (,) in the filename
			.map((file) => `"${file}"`);

		let csvData = [(new Date).toISOString(), '[wtt-files]'].concat(filenames);
		let path = this.derivedOptions.cwd + '/' + this.options.directoryName + '/' + this.derivedOptions.userId;
		fs.appendFileSync(path, csvData.join(',') + '\n');
	}
}
