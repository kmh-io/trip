import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import * as path from 'path';

export interface Config {
  http: {
    host: string;
    port: number;
  };
  postgres: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
  };
}

export const loadYamlConfig = async (filepath: string) => {
  const file = await readFile(path.resolve(filepath), 'utf8');
  return yaml.load(file) as Config;
};

export const loadConfig = () => {
  const config = loadYamlConfig('./config.yml');
  return config;
};
