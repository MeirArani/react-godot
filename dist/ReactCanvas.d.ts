import { FunctionComponent } from "react";
import type { Engine } from "./typings";
import { GodotEngineConfig } from "./index";
export interface CanvasProps {
    engine: Engine;
    pck: string;
    wasm?: string;
    width?: number;
    height?: number;
    config: GodotEngineConfig;
    resize?: boolean;
}
declare const ReactCanvas: FunctionComponent<CanvasProps>;
export default ReactCanvas;
