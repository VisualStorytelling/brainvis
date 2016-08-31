Caleydo CLUE Dummy ![Caleydo Web Application](https://img.shields.io/badge/Caleydo%20Web-Application-1BA64E.svg)
==================

This is a simple application highlighting the features of the Caleydo CLUE Plugin. Users can drag-and-drop data 
items from the databrowser that trigger corresponding actions in the CLUE provenance graph. 

Installation
------------
```bash
./manage.sh clone Caleydo/clue_dummy
./manage.sh resolve
```

If you want this plugin to be dynamically resolved as part of another application of plugin, you need to add it as a peer dependency to the _package.json_ of the application or plugin it should belong to:

```json
{
  "peerDependencies": {
    "clue_dummy": "*"
  }
}
```

***

<a href="https://caleydo.org"><img src="http://caleydo.org/assets/images/logos/caleydo.svg" align="left" width="200px" hspace="10" vspace="6"></a>
This repository is part of **[Caleydo Web](http://caleydo.org/)**, a platform for developing web-based visualization applications. For tutorials, API docs, and more information about the build and deployment process, see the [documentation page](http://caleydo.org/documentation/).

