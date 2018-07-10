/* There is a bug in `ami.js` so that it needs a global THREE when imported.
   This file ensures it is attached to `window` before the rest of the app is loaded
 */
(window as any).THREE = require('three');
require('./init.ts');
