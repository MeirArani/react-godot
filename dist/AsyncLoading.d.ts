import { FunctionComponent } from 'react';
export interface PackLoadingState {
    mode: string;
    initializing: boolean;
    percent?: number;
    msg?: string;
}
export interface PackLoadingAction {
    msg?: string;
    initialized?: boolean;
    percent?: number;
    mode: string;
}
export declare type PackLoadingDispatch = (action: PackLoadingAction) => void;
export declare const useLoading: () => [PackLoadingState, PackLoadingDispatch];
declare const AsyncLoading: FunctionComponent;
export default AsyncLoading;
