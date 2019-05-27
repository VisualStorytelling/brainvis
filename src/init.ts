import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const Stats = require('stats-js');

const stats = new Stats();
function animate() {
  stats.begin();
  // monitored code goes here

  stats.end();
  requestAnimationFrame( animate );
}

if (environment.production) {
  enableProdMode();
} else {
  /* show stats */
  // stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // document.body.appendChild( stats.dom );
  // requestAnimationFrame( animate );
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

