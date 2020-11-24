"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathJaxNode_ = void 0;
const React = __importStar(require("react"));
const types = {
    ascii: "asciimath",
    tex: "tex",
};
const context_1 = __importDefault(require("./context"));
const provider_1 = __importDefault(require("./provider"));
class MathJaxNode_ extends React.Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
        this.typeset = this.typeset.bind(this);
        this.clear = this.clear.bind(this);
    }
    /**
     * Render the math once the node is mounted
     */
    componentDidMount() {
        setTimeout(() => this.typeset(), 0);
    }
    /**
     * Update the jax, force update if the display mode changed
     */
    componentDidUpdate(prevProps) {
        const forceUpdate = prevProps.inline !== this.props.inline ||
            prevProps.children !== this.props.children;
        this.typeset(forceUpdate);
    }
    /**
     * Clear the math when unmounting the node
     */
    componentWillUnmount() {
        this.clear();
    }
    /**
     * Clear the jax
     */
    clear() {
        const MathJax = this.props.MathJax;
        if (!MathJax) {
            return;
        }
        if (!this.script) {
            return;
        }
        const jax = MathJax.Hub.getJaxFor(this.script);
        if (jax) {
            jax.Remove();
        }
    }
    /**
     * Update math in the node
     * @param { Boolean } forceUpdate
     */
    typeset(forceUpdate = false) {
        const { MathJax } = this.props;
        if (!MathJax || !MathJax.Hub) {
            throw Error("Could not find MathJax while attempting typeset! It's likely the MathJax script hasn't been loaded or MathJax.Context is not in the hierarchy.");
        }
        const text = this.props.children;
        if (forceUpdate) {
            this.clear();
        }
        if (forceUpdate || !this.script) {
            this.setScriptText(text);
        }
        if (!this.script) {
            return;
        }
        const reprocess = ["Reprocess", MathJax.Hub, this.script];
        if (!this.props.onRender) {
            MathJax.Hub.Queue(reprocess);
        }
        else {
            MathJax.Hub.Queue(reprocess, this.props.onRender);
        }
    }
    /**
     * Create a script
     * @param { String } text
     */
    setScriptText(text) {
        const inline = this.props.inline;
        const type = types[this.props.input];
        if (!this.script) {
            this.script = document.createElement("script");
            this.script.type = `math/${type}; ${inline ? "" : "mode=display"}`;
            if (this.nodeRef.current) {
                this.nodeRef.current.appendChild(this.script);
            }
        }
        // It _should_ be defined at this point, we'll just return at this point now
        if (!this.script) {
            return;
        }
        this.script.text = text;
    }
    render() {
        return React.createElement("span", { ref: this.nodeRef });
    }
}
exports.MathJaxNode_ = MathJaxNode_;
class MathJaxNode extends React.PureComponent {
    render() {
        return (React.createElement(context_1.default.Consumer, null, ({ MathJax, input, hasProviderAbove }) => {
            // If there is no <Provider /> in the above tree, create our own
            if (!hasProviderAbove) {
                return (React.createElement(provider_1.default, null,
                    React.createElement(MathJaxNode, Object.assign({}, this.props))));
            }
            if (!MathJax) {
                return null;
            }
            return (React.createElement(MathJaxNode_, { inline: this.props.inline, onRender: this.props.onRender, input: input, MathJax: MathJax, hasProviderAbove: hasProviderAbove }, this.props.children));
        }));
    }
}
exports.default = MathJaxNode;
MathJaxNode.defaultProps = {
    inline: false,
    onRender: null,
};
