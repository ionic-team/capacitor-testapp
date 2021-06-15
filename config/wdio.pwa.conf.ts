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
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--use-file-for-fake-video-capture=/Users/max/git/capacitor-testapp/tests/data/stefan_sif.y4m']
  }]
];

config.capabilities = [{
  browserName: 'chrome',
  'wdio:devtoolsOptions': {
    headless: true
  },
  'goog:chromeOptions': {
    prefs: {
      // 'hardware.video_capture_enabled': 1,
      // 'hardware.video_capture_allowed_urls': 'http://localhost:3000',
      // 'hardware.audio_capture_allowed_urls': 'http://localhost:3000',
      'profile.default_content_setting_values.media_stream_camera': 1,
      'profile.default_content_setting_values.media_stream_mic': 1,
      'profile.default_content_setting_values.notifications': 1
    }
  }
}];

exports.config = config;
