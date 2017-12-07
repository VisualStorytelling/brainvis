/* *****************************************************************************
 * Caleydo - Visualization for Molecular Biology - http://caleydo.org
 * Copyright (c) The Caleydo Team. All rights reserved.
 * Licensed under the new BSD license, available at http://caleydo.org/license
 **************************************************************************** */

//register all extensions in the registry following the given pattern
module.exports = function (registry) {
  // generator-phovea:begin
  registry.push('app', 'brainvis', null, {
    'name': 'BRAINVIS Demo'
  });

  registry.push('actionFactory', 'brainvis', function () {
    return System.import('./src/brainvisCmds');
  }, {
    'factory': 'createCmd',
    'creates': '(setCameraMatrix)'
  });
  // generator-phovea:end
};
