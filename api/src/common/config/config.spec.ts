import { Config, loadYamlConfig } from './config.yml';

describe('Load Config', () => {
  it('should load yaml config file, validate and return', async () => {
    const want: Config = {
      http: {
        host: '127.0.0.1',
        port: 8080,
      },
      postgres: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '12345678',
        database: 'onetrip',
      },
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    };
    const actual = await loadYamlConfig('./config.yml');

    expect(actual).toEqual(want);
  });
});
