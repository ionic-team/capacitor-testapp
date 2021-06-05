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
config.services = [
  ['chromedriver', {
    args: ['--use-fake-ui-for-media-stream']
  }]
];

config.capabilities = [{
  browserName: 'chrome',
  'wdio:devtoolsOptions': {
    // headless: true
  },
  'goog:chromeOptions': {
    prefs: {
      // 'hardware.video_capture_allowed_urls': 'http://localhost:3000',
      // 'hardware.audio_capture_allowed_urls': 'http://localhost:3000',
      'profile.default_content_setting_values.media_stream_camera': 1,
      'profile.default_content_setting_values.media_stream_mic': 1
    }
  }
}];

exports.config = config;
