# react-godot-4

> Load a webassembly build of Godot and Bootstrap packed games from within the react component tree.

![NPM Version](https://img.shields.io/npm/v/react-godot-4?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat)

## Install

```bash
npm install --save react-godot-4
```

## Usage

```tsx
import * as React from "react";

import ReactGodot from "react-godot-4";

class Example extends React.Component {
  render() {
    return (
      <ReactGodot
        script="/path/to/myGame.js"
        pck="/path/to/myGame.pck"
        wasm="/path/to/myGame.wasm"
      />
    );
  }
}
```

## Godot 4

### Background

This package was originally developed by [d3dc](https://github.com/d3dc/react-godot). Unfortunately, their builds no longer seem to work with newer versions of Godot. This seems to stem from a change in how configuration data (specifically the WASM file) is passed into the engine.

Thankfully, [Eric Wang](https://github.com/ezwang/react-godot) forked the original repo and added some fixes for this issue. Unfortunately though, he did not publish his changes to a site like npm...leaving the project (and the original d3dc repo) more-or-less abandoned.

Having come across this issue, I decided to add some new functionality to Eric's code and publish it as a 'new' package. Hopefully the name indicates _why_ this exists in the first place.

### Custom Configuration

When you generate a web build, godot packages some configuration information in the `index.html` file like so:

```html
<script>
  const GODOT_CONFIG = {
    args: [],
    canvasResizePolicy: 2,
    ensureCrossOriginIsolationHeaders: true,
    executable: "index",
    experimentalVK: false,
    fileSizes: { "index.pck": 3531856, "index.wasm": 43699190 },
    focusCanvas: true,
    gdextensionLibs: [],
  };
  const GODOT_THREADS_ENABLED = false;
  const engine = new Engine(GODOT_CONFIG);
```

This `GODOT_CONFIG` data isn't _needed_ for most games to run...but if you would like your configuration data passed to the engine, you can just copy/paste it from your index file into a simple js object and pass it as the additional `config` prop like so:

```tsx
"use client";
import React from "react";
import ReactGodot, { GodotEngineConfig } from "react-godot";

export default function TestGame() {
  const config: GodotEngineConfig = {
    args: [],
    canvasResizePolicy: 2,
    ensureCrossOriginIsolationHeaders: true,
    executable: "index",
    experimentalVK: false,
    focusCanvas: true,
    gdextensionLibs: [],
  };
  return (
    <ReactGodot
      pck="/games/3d/Squash the Creeps (3D).pck"
      script="/games/3d/Squash the Creeps (3D).js"
      wasm="/games/3d/Squash the Creeps (3D).wasm"
      width={1200}
      height={780}
      config={config}
    ></ReactGodot>
  );
}
```

The `GodotEngineConfig` type _should_ 'just work'...but if you spot any issues, send me a pull request and I'll have it fixed up.

## License

Originally MIT © [d3dc](https://github.com/d3dc)

Later contributions by [Eric Wang](https://github.com/ezwang/react-godot) and [Meir Arani](https://github.com/MeirArani)
