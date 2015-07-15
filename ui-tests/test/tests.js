'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://www.psu.edu';

describe('Live testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .webdrivercss(testName, {
        name: 'homepage',
        exclude:
          [
            '#block-psu-homepage-psu-homepage-rotator',
            '.block-landing-page-blocks-block-5',
            '.field-group-format',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the research page',function(done) {
    client
      .url(baseUrl + '/research')
      .webdrivercss(testName, {
        name: 'research',
        exclude:
          [
            '.even img',
            '#region-footer-preface img',
          ],
        remove:
          [
            '.even h2',
            '.even .field-type-text-long',
            '#region-sidebar-second a',
            '#block-psu-feature-article-generic-links a',
            '#region-footer-preface .views-field-title',
            '#region-footer-preface .views-field-body',
          ]
      },shoovWebdrivercss.processResults)
      .call(done);
  });
});
