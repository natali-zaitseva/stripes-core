import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import ModulesContext, { originalModules } from '../../ModulesContext';

class ModuleTranslator extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    intl: intlShape,
  }

  constructor(props) {
    super(props);

    this.state = {
      modules: this.translateModules(),
    };
  }

  translateModules = () => {
    return {
      app: (originalModules.app || []).map(this.translateModule),
      plugin: (originalModules.plugin || []).map(this.translateModule),
      settings: (originalModules.settings || []).map(this.translateModule),
    };
  }

  translateModule = (module) => {
    const { formatMessage } = this.props.intl;

    return {
      ...module,
      displayName: module.displayName ? formatMessage({ id: module.displayName }) : undefined,
    };
  }

  render() {
    return (
      <ModulesContext.Provider value={this.state.modules}>
        { this.props.children }
      </ModulesContext.Provider>
    );
  }
}

export default injectIntl(ModuleTranslator);
