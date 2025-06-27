/**
 * @function ReactGodot
 */
import "./styles.css";
import { FunctionComponent } from "react";
import type { EngineLoaderDescription } from "./typings";
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
declare const ReactGodot: FunctionComponent<ReactGodotProps>;
export default ReactGodot;
