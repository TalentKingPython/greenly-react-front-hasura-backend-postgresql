const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const databaseName = 'greenly-db-local';
const backupPath = '/Users/mfs-remo/Desktop/Greenly/db-backups/2_15_23';
async function startLocalPostgres() {
  console.log('Starting local Postgres database...');

  // Start up local Postgres database
  const { stdout, stderr } = await execAsync('pg_ctl start -l logfile');

  console.log(stdout);
  console.error(stderr);

  console.log('Creating local database...');
  const { stdout: createDbStdout, stderr: createDbStderr } = await execAsync(
    `createdb ${databaseName} -U postgres`
  );

  console.log(createDbStdout);
  console.error(createDbStderr);

  // Load snapshot into local Postgres database
  console.log('Loading snapshot into local Postgres database...');
  const { stdout: restoreStdout, stderr: restoreStderr } = await execAsync(
    `pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d ${databaseName} ${backupPath}`
  );

  console.log(restoreStdout);
  console.error(restoreStderr);
}

async function startApp() {
  await startLocalPostgres();

  // Start your application here
}

startApp();
