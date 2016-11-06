/* *****************************************************************************
 * Caleydo - Visualization for Molecular Biology - http://caleydo.org
 * Copyright (c) The Caleydo Team. All rights reserved.
 * Licensed under the new BSD license, available at http://caleydo.org/license
 **************************************************************************** */

//register all extensions in the registry following the given pattern
module.exports = function(registry) {
  //registry.push('extension-type', 'extension-id', function() { return System.import('./src/extension_impl'); }, {});
  // generator-phovea:begin
  registry.push('application', 'clue_dummy', function() { return System.import('./src/'); }, {
  'name': 'CLUE Demo'
 });

  registry.push('actionFactory', 'clue_demo', function() { return System.import('./src/cmds'); }, {
  'factory': 'createCmd',
  'creates': '(addClueElem|removeClueElem)'
 });
  // generator-phovea:end
};

