"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePopoverControls = exports.NativePopover = void 0;
const react_1 = __importStar(require("react"));
function NativePopover(props) {
    var _a;
    const id = (0, react_1.useRef)(generateId());
    if (props.id) {
        id.current = props.id;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.trigger({ popovertarget: id.current }),
        props.popover({
            id: id.current,
            popover: (_a = props.type) !== null && _a !== void 0 ? _a : "auto",
            ref: props.control,
        }, {
            popovertarget: id.current,
            popovertargetaction: "hide",
        })));
}
exports.NativePopover = NativePopover;
function usePopoverControls() {
    const ref = (0, react_1.useRef)(null);
    const listenerRegistered = (0, react_1.useRef)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const show = () => {
        if (!supportsPopover()) {
            return apiSupportWarning();
        }
        if (ref.current && "showPopover" in ref.current) {
            ref.current.showPopover();
        }
        else {
            return noRefWarning();
        }
    };
    const hide = () => {
        if (!supportsPopover()) {
            return apiSupportWarning();
        }
        if (ref.current && "hidePopover" in ref.current) {
            ref.current.hidePopover();
        }
        else {
            return noRefWarning();
        }
    };
    const toggle = () => {
        if (!supportsPopover()) {
            return apiSupportWarning();
        }
        if (ref.current && "togglePopover" in ref.current) {
            ref.current.togglePopover();
        }
        else {
            return noRefWarning();
        }
    };
    const beforeToggle = (0, react_1.useCallback)((event) => {
        if ("newState" in event && event.newState === "open") {
            setIsOpen(true);
        }
        if ("newState" in event && event.newState === "closed") {
            setIsOpen(false);
        }
    }, [setIsOpen]);
    const refApplier = (element) => {
        if (element) {
            ref.current = element;
            listenerRegistered.current = true;
            element.addEventListener("beforetoggle", beforeToggle);
        }
    };
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            setIsOpen(ref.current.matches(":popover-open"));
            ref.current.addEventListener("beforetoggle", beforeToggle);
        }
        return () => {
            if (ref.current && listenerRegistered.current) {
                ref.current.removeEventListener("beforetoggle", beforeToggle);
            }
        };
    }, []);
    return {
        show,
        hide,
        toggle,
        control: refApplier,
        isOpen,
    };
}
exports.usePopoverControls = usePopoverControls;
function apiSupportWarning() {
    console.warn("Popover API is not supported in your browser");
}
function noRefWarning() {
    console.warn("Ref is not registered, popover controls will not work");
}
function supportsPopover() {
    // eslint-disable-next-line no-prototype-builtins
    return HTMLElement.prototype.hasOwnProperty("popover");
}
let i = 0;
function generateId() {
    return `popover-${i++}`;
}
