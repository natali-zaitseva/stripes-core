// This webpack plugin wraps all other stripes webpack plugins to simplify inclusion within the webpack config

const StripesConfigPlugin = require('./stripes-config-plugin');
const StripesBrandingPlugin = require('./stripes-branding-plugin');
const StripesTranslationsPlugin = require('./stripes-translations-plugin');
const StripesDuplicatesPlugin = require('./stripes-duplicate-plugin');
const logger = require('./logger')('stripesWebpackPlugin');

module.exports = class StripesWebpackPlugin {
  constructor(options) {
    this.stripesConfig = options.stripesConfig;
  }

  apply(compiler) {
    logger.log('Creating Stripes plugins...');
    const stripesPlugins = [
      new StripesConfigPlugin(this.stripesConfig),
      new StripesBrandingPlugin(this.stripesConfig.branding),
      new StripesTranslationsPlugin(this.stripesConfig),
      new StripesDuplicatesPlugin(),
    ];

    logger.log('Applying Stripes plugins...');
    stripesPlugins.forEach(plugin => plugin.apply(compiler));
  }
};
