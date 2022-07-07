import { parse } from 'csv-parse/lib/sync'
import * as path from 'path'
import * as fs from 'fs'

import moment = require('moment');

import { PluginDerivedOptions, PluginOptions } from '../../main';
import { ParsedData, ParsedDataEntry, ParsedDataUser } from '../../parsedData';
import { CSV_FILES_OPCODE, DATE_FORMAT } from './filesystemConsts';
import { IReader } from '../IMapper';

export default class Reader implements IReader {
	private options: PluginOptions;
	private derivedOptions: PluginDerivedOptions;

	constructor(cfg: PluginOptions, derivedCfg: PluginDerivedOptions) {
		this.options = cfg;
		this.derivedOptions = derivedCfg;
	}

	readActivity(): ParsedData {
		let dir = path.join(this.derivedOptions.cwd, this.options.directoryName);
		let users = [];

		fs.readdirSync(dir).forEach(file => {
			let input = fs.readFileSync(path.join(dir, file));
			let output = parse(input.toString(), {relax_column_count: true});
			let parsedOutput:ParsedDataEntry[] = output.map((entry: string[]) => {
				// TODO remove in public version
				let isLegacyFormat = entry[0].includes('Z');

				return {
					time: isLegacyFormat ? moment(entry[0]) : moment(entry[0], DATE_FORMAT),
					files: entry.slice(entry.indexOf(CSV_FILES_OPCODE) + 1) // take all array elements after the opcode
				}
			});

			let userData: ParsedDataUser = {
				entries: parsedOutput,
				id: file
			};

			users.push(userData)
		});

		return {
			users
		}
	}
}
