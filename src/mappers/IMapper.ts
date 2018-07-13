import { PluginDerivedOptions, PluginOptions } from '../main';
import { ParsedData } from '../parsedData';

export interface IReader {
	readActivity(): ParsedData
}

export interface IWriter {
	writeActivity(filenames: string[])
}
