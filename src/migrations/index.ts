import * as migration_20260309_211234 from './20260309_211234';

export const migrations = [
  {
    up: migration_20260309_211234.up,
    down: migration_20260309_211234.down,
    name: '20260309_211234'
  },
];
