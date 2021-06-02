import { join } from 'path';
import { config } from './wdio.shared.conf';

// ============
// Specs
// ============
config.specs = [
  './tests/specs/**/browser*.spec.ts',
];

// ============
// Capabilities
// ============
// For all capabilities please check
config.services = ['chromedriver'];

config.capabilities = [{
  browserName: 'chrome',
  'wdio:devtoolsOptions': {
    // headless: true
  }
}];

exports.config = config;
