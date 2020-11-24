import * as React from "react";
import { MathJaxContextValue } from "./context";
interface Props {
    children: string;
    onRender?: () => void;
}
export declare class MathJaxText_ extends React.Component<Props & MathJaxContextValue> {
    nodeRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props & MathJaxContextValue);
    componentDidMount(): void;
    componentDidUpdate(): void;
    typeset(): void;
    render(): JSX.Element;
}
declare class MathJaxText extends React.PureComponent<Props> {
    static defaultProps: {
        onRender: null;
    };
    render(): JSX.Element;
}
export default MathJaxText;
