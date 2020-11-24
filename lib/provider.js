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
const React = __importStar(require("react"));
const load_script_1 = __importDefault(require("load-script"));
const context_1 = __importDefault(require("./context"));
/**
 * MathJax Provider
 */
class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = () => {
            if (typeof MathJax === "undefined" || !MathJax || !MathJax.Hub) {
                this.props.onError(new Error("MathJax not really loaded even though onLoad called"));
                return;
            }
            const options = this.props.options;
            if (options != null && Object.keys(options).length > 0) {
                MathJax.Hub.Config(options);
            }
            MathJax.Hub.Register.StartupHook("End", () => {
                if (typeof MathJax === "undefined" || !MathJax) {
                    this.props.onError(new Error("MathJax became undefined in the middle of processing"));
                    return;
                }
                MathJax.Hub.processSectionDelay = this.props.delay;
                if (this.props.didFinishTypeset) {
                    this.props.didFinishTypeset();
                }
            });
            MathJax.Hub.Register.MessageHook("Math Processing Error", (message) => {
                if (this.props.onError) {
                    this.props.onError(new Error(message));
                }
            });
            if (this.props.onLoad) {
                this.props.onLoad();
            }
            this.setState({
                MathJax,
            });
        };
        this.state = {
            MathJax: undefined,
            input: this.props.input,
            hasProviderAbove: true,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.input !== props.input) {
            return Object.assign(Object.assign({}, state), { input: props.input });
        }
        return null;
    }
    componentDidMount() {
        const src = this.props.src;
        if (src === undefined) {
            return this.onLoad();
        }
        if (typeof MathJax === "undefined" || !MathJax || !MathJax.Hub) {
            return load_script_1.default(src, this.onLoad);
        }
        this.onLoad();
    }
    render() {
        return (React.createElement(context_1.default.Provider, { value: this.state }, this.props.children));
    }
}
exports.default = Provider;
Provider.defaultProps = {
    src: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML",
    input: "tex",
    didFinishTypeset: null,
    delay: 0,
    options: {},
    loading: null,
    noGate: false,
    onLoad: null,
    onError: (err) => {
        console.error(err);
    },
};
