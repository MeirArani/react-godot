/**
 * @function ReactGodot
 */

import "./styles.css";

import * as React from "react";

import { FunctionComponent, useEffect, useRef, useState } from "react";

import AsyncLoading from "./AsyncLoading";
import ReactCanvas from "./ReactCanvas";

import type { Engine, EngineLoaderDescription } from "./typings";

const useScript = (url: string, onLoad: () => void) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    script.onload = onLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export interface ReactGodotProps {
  script: EngineLoaderDescription;
  pck: string;
  wasm?: string;
  resize?: boolean;
  width?: number;
  height?: number;
  config?: any;
}

export interface FileSizeDictionary {
  [filename: string]: number;
}

export interface GodotEngineConfig {
  canvas?: HTMLCanvasElement | null;
  executable?: string;
  mainPack?: string;
  locale?: string;
  canvasResizePolicy?: number;
  persistentPaths?: string[];
  persistentDrops?: string[];
  experimentalVK?: boolean;
  focusCanvas?: boolean;
  serviceWorker?: string;
  gdextensionLibs?: string[];
  fileSizes?: FileSizeDictionary;
  emscriptenPoolSize?: number;
  godotPoolSize?: number;
  args?: string[];
  ensureCrossOriginIsolationHeaders?: boolean;
  unloadAfterInit?: boolean;
  libs?: string[];
  onExecute?: (path: string, executeArgs: Array<string>) => void;
  onExit?: (status_code: number) => void;
  onProgress?: (current: number, total: number) => void;
  onPrint?: (...var_args: any[]) => void;
  onPrintError?: (...var_args: any[]) => void;
}

const ReactGodot: FunctionComponent<ReactGodotProps> = (props) => {
  const {
    script,
    pck,
    wasm,
    resize = false,
    width,
    height,
    config: config,
  } = props;
  const outerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<Engine>(null);
  const [dimensions, setDimensions] = useState([width, height]);

  useScript(script, () => {
    const scope = window as any;
    setEngine(() => scope.Engine);
  });

  useEffect(() => {
    if (resize && outerRef.current != null) {
      setDimensions([
        outerRef.current.clientWidth,
        outerRef.current.clientHeight,
      ]);
    }
  }, [resize, outerRef.current]);

  return (
    <div id="wrap" ref={outerRef}>
      <AsyncLoading>
        {engine && (
          <ReactCanvas
            pck={pck}
            engine={engine}
            wasm={wasm}
            width={dimensions[0]}
            height={dimensions[1]}
            config={config}
          />
        )}
      </AsyncLoading>
    </div>
  );
};

export default ReactGodot;
