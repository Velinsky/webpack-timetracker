import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { unless, memoize } from 'ramda';
import * as fs from 'fs';
import * as moment from 'moment';

import { PluginDerivedOptions, PluginOptions } from '../../main';
import { CSV_FILES_OPCODE } from './filesystemConsts';
import { IWriter } from '../IMapper';

const createIfNotExists = (cwd) => (path) => unless(
	existsSync,
	mkdirSync
)(join(cwd, path));

export default class Writer implements IWriter {
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

		let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss ZZ');
		let csvData = [formattedDate, CSV_FILES_OPCODE].concat(filenames);
		let path = this.derivedOptions.cwd + '/' + this.options.directoryName + '/' + this.derivedOptions.userId;
		fs.appendFileSync(path, csvData.join(',') + '\n');
	}
}
