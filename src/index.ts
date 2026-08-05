import { KCVCLI } from './kcv/cli';

console.log('Args:', process.argv);

const cli = new KCVCLI();
cli.run(process.argv.slice(2)).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
