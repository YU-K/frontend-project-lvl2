#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(
    gendiff(firstConfig, secondConfig, program.format),
  ))
  .parse(process.argv);
