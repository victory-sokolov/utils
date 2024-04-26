import process from 'node:process';

/**
 * Get CMD arguments
 * Example:
 * node my-script.js --name=John --age=30
 * getCmdArgs(); // ['--name=John', '--age=30']
 * @returns CMD args
 */
export const getCmdArgs = () => process.argv.slice(2);
