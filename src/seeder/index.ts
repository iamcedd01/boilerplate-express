import requireAll from 'require-all';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Seeder {
  static async run() {
    const collections = requireAll(`${process.cwd()}/build/seeder/collections`);

    ['doctor'].forEach(async (key) => {
      for (const seed in collections) {
        if (seed.startsWith(key)) {
          collections[seed].run();
        }
      }
    });
  }
}

void Seeder.run();
