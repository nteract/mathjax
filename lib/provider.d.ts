import * as React from "react";
import { MathJaxContextValue, MathJaxObject } from "./context";
interface Props {
    src?: string;
    children: React.ReactNode;
    input: "ascii" | "tex";
    delay: number;
    options: object;
    loading: React.ReactNode;
    noGate: boolean;
    didFinishTypeset?(): void;
    onLoad?(): void;
    onError(err: Error): void;
}
declare type State = MathJaxContextValue;
/**
 * MathJax Provider
 */
export default class Provider extends React.Component<Props, State> {
    static defaultProps: {
        src: string;
        input: string;
        didFinishTypeset: null;
        delay: number;
        options: {};
        loading: null;
        noGate: boolean;
        onLoad: null;
        onError: (err: Error) => void;
    };
    static getDerivedStateFromProps(props: Props, state: State): {
        input: "tex" | "ascii";
        MathJax?: MathJaxObject | undefined;
        hasProviderAbove?: boolean | undefined;
    } | null;
    constructor(props: Props);
    componentDidMount(): void;
    onLoad: () => void;
    render(): JSX.Element;
}
export {};
