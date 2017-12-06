clue_dummy [![Phovea][phovea-image]][phovea-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
=====================

This is a simple application highlighting the features of the [Caleydo CLUE](https://github.com/Caleydo/caleydo_clue) plugin. Users can drag-and-drop data items from the databrowser that trigger corresponding actions in the CLUE provenance graph.


Installation
------------

```
git clone https://github.com/caleydo/clue_dummy.git
cd clue_dummy
npm install
```

Testing
-------

```
npm test
```

Building
--------

```
npm run build
```

Development
-----------

```
docker run -d -p 9000:80 caleydo/taco_server
npm run start
```

Goto http://localhost:8080 , page will reload with every change in src/ dir.

***

<a href="https://caleydo.org"><img src="http://caleydo.org/assets/images/logos/caleydo.svg" align="left" width="200px" hspace="10" vspace="6"></a>
This repository is part of **[Phovea](http://phovea.caleydo.org/)**, a platform for developing web-based visualization applications. For tutorials, API docs, and more information about the build and deployment process, see the [documentation page](http://phovea.caleydo.org).


[phovea-image]: https://img.shields.io/badge/Phovea-Application-1BA64E.svg
[phovea-url]: https://phovea.caleydo.org
[npm-image]: https://badge.fury.io/js/clue_dummy.svg
[npm-url]: https://npmjs.org/package/clue_dummy
[travis-image]: https://travis-ci.org/caleydo/clue_dummy.svg?branch=master
[travis-url]: https://travis-ci.org/caleydo/clue_dummy
[daviddm-image]: https://david-dm.org/caleydo/clue_dummy/status.svg
[daviddm-url]: https://david-dm.org/caleydo/clue_dummy
