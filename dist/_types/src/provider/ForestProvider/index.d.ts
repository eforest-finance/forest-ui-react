import React from 'react';
import { BasicActions } from './baseAction';
import { ForestState } from './actions';
export declare function useForestStore(): [ForestState, BasicActions];
export declare function ForestProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default ForestProvider;
