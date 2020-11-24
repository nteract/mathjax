import * as React from "react";
import { MathJaxContextValue } from "./context";
interface Props {
    inline: boolean;
    children: string;
    onRender?: () => void;
}
export declare class MathJaxNode_ extends React.Component<Props & MathJaxContextValue> {
    script?: HTMLScriptElement;
    nodeRef: React.RefObject<HTMLSpanElement>;
    constructor(props: Props & MathJaxContextValue);
    /**
     * Render the math once the node is mounted
     */
    componentDidMount(): void;
    /**
     * Update the jax, force update if the display mode changed
     */
    componentDidUpdate(prevProps: Props & MathJaxContextValue): void;
    /**
     * Clear the math when unmounting the node
     */
    componentWillUnmount(): void;
    /**
     * Clear the jax
     */
    clear(): void;
    /**
     * Update math in the node
     * @param { Boolean } forceUpdate
     */
    typeset(forceUpdate?: boolean): void;
    /**
     * Create a script
     * @param { String } text
     */
    setScriptText(text: string): void;
    render(): JSX.Element;
}
export default class MathJaxNode extends React.PureComponent<Props> {
    static defaultProps: {
        inline: boolean;
        onRender: null;
    };
    render(): JSX.Element;
}
export {};
