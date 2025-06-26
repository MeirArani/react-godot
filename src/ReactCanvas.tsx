import * as React from "react";

import {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { useLoading } from "./AsyncLoading";
import type { Engine } from "./typings";

export interface FileSizeDictionary {
  [filename: string]: number;
}

export interface GodotEngineConfig {
  canvas?: HTMLCanvasElement;
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
  onExecute?: (path: string, executeArgs: Array<string>) => Function;
  onExit?: (status_code: number) => Function;
  onProgress?: (current: number, total: number) => Function;
  onPrint?: (...var_args: any[]) => Function;
  onPrintError?: (...var_args: any[]) => Function;
}

export interface ReactEngineProps {
  engine: Engine;
  pck: string;
  wasm?: string;
  width?: number;
  height?: number;
  config: GodotEngineConfig;
  resize?: boolean;
}

function toFailure(err: any) {
  const msg = err.message || err;
  console.error(msg);
  return { msg, mode: "notice", initialized: true };
}

const ReactCanvas: FunctionComponent<ReactEngineProps> = ({
  engine,
  pck,
  wasm,
  width = 480,
  height = 300,
  config: config,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [instance, setInstance] = useState<Engine | null>(null);
  const [loadingState, changeLoadingState] = useLoading();

  useEffect(() => {
    if (engine.isWebGLAvailable()) {
      changeLoadingState({ mode: "indeterminate" });
      setInstance(new engine(config));
    } else {
      changeLoadingState(toFailure("WebGL not available"));
    }
  }, [engine]);

  const progressFunc = useCallback((current: number, total: number) => {
    if (total > 0) {
      changeLoadingState({ mode: "progress", percent: current / total });
    } else {
      changeLoadingState({ mode: "indeterminate" });
    }
  }, []);

  useEffect(() => {
    if (instance != null) {
      const olderGodot = typeof instance.setProgressFunc === "function";
      console.log("starting", canvasRef.current, instance);

      if (!olderGodot && wasm == null) {
        changeLoadingState(
          toFailure(
            "You must pass in the wasm prop for newer versions of Godot!"
          )
        );
        return;
      }

      instance
        .startGame(
          olderGodot
            ? pck
            : {
                executable: wasm?.replace(/\.wasm$/i, ""),
                canvas: canvasRef.current,
                mainPack: pck,
                canvasResizePolicy: 0,
                onProgress: progressFunc,
              }
        )
        .then(() => {
          changeLoadingState({ mode: "hidden", initialized: true });
        })
        .catch((err: any) => changeLoadingState(toFailure(err)));

      // older versions of Godot have this callback register
      if (olderGodot) {
        instance.setProgressFunc(progressFunc);
      }
    }
  }, [instance, pck, wasm, changeLoadingState]);

  useEffect(() => {
    // older versions of Godot use this method to set the canvas
    if (instance && typeof instance.setCanvas === "function") {
      instance.setCanvas(canvasRef.current);
    }
  }, [instance, canvasRef.current]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={width}
      height={height}
      style={{ display: loadingState.initializing ? "hidden" : "block" }}
    >
      HTML5 canvas appears to be unsupported in the current browser.
      <br />
      Please try updating or use a different browser.
    </canvas>
  );
};

export default ReactCanvas;
