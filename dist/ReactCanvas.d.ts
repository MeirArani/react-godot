import { FunctionComponent } from "react";
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
declare const ReactCanvas: FunctionComponent<ReactEngineProps>;
export default ReactCanvas;
