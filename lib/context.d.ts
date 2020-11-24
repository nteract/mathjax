import * as React from "react";
export interface MathJaxObject {
    Hub: {
        Register: {
            StartupHook(str: string, cb: () => void): void;
            MessageHook(str: string, cb: (msg: string) => void): void;
        };
        processSectionDelay: number;
        getJaxFor(node: HTMLElement): any;
        Config(options: object): void;
        Queue(elements: any[], onRender?: () => void): void;
    };
}
export interface MathJaxContextValue {
    MathJax?: MathJaxObject;
    input: "tex" | "ascii";
    hasProviderAbove?: boolean;
}
declare const MathJaxContext: React.Context<MathJaxContextValue>;
export default MathJaxContext;
