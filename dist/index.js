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
exports.browserSupportsPopover = exports.registerPopoverListener = exports.usePopoverControls = exports.NativePopover = void 0;
const react_1 = __importStar(require("react"));
function NativePopover(props) {
    var _a;
    const anchorId = (0, react_1.useRef)(generateId());
    const id = (0, react_1.useRef)(generateId());
    if (props.id) {
        id.current = props.id;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.trigger({
            popovertarget: id.current,
            id: anchorId.current,
        }),
        props.popover({
            id: id.current,
            popover: (_a = props.type) !== null && _a !== void 0 ? _a : "auto",
            ref: props.control,
            anchor: props.anchor ? anchorId.current : undefined,
        }, {
            popovertarget: id.current,
            popovertargetaction: "hide",
        })));
}
exports.NativePopover = NativePopover;
const errors = {
    notSupported: "Popover API is not supported in your browser",
    notMounted: "Target element is not mounted, or does not support popover API",
};
function usePopoverControls(args) {
    const hasSetInitial = (0, react_1.useRef)(false);
    const registeredId = (0, react_1.useRef)(null);
    const ref = (0, react_1.useRef)(null);
    const listenerRegistered = (0, react_1.useRef)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const createError = (error) => {
        if (args === null || args === void 0 ? void 0 : args.onError) {
            args.onError(error);
        }
        if (args === null || args === void 0 ? void 0 : args.throwOnError) {
            throw new Error(error);
        }
        else {
            console.error(errors);
        }
    };
    const show = (0, react_1.useCallback)(() => {
        if (!browserSupportsPopover()) {
            return createError(errors.notSupported);
        }
        if (!ref.current || !("showPopover" in ref.current))
            return createError(errors.notMounted);
        return ref.current.showPopover();
    }, []);
    const hide = (0, react_1.useCallback)(() => {
        if (!browserSupportsPopover()) {
            return createError(errors.notSupported);
        }
        if (!ref.current || !("togglePopover" in ref.current))
            return createError(errors.notMounted);
        return ref.current.hidePopover();
    }, []);
    const toggle = (0, react_1.useCallback)(() => {
        if (!browserSupportsPopover()) {
            return createError(errors.notSupported);
        }
        if (!ref.current || !("togglePopover" in ref.current))
            return createError(errors.notMounted);
        return ref.current.togglePopover();
    }, []);
    const beforeToggle = (0, react_1.useCallback)((event) => {
        if ("newState" in event && event.newState === "open") {
            setIsOpen(true);
        }
        if ("newState" in event && event.newState === "closed") {
            setIsOpen(false);
        }
    }, [setIsOpen]);
    const refApplier = (0, react_1.useCallback)((element) => {
        if (element) {
            if (!(element instanceof HTMLElement)) {
                return createError("Element passed to ref is not an HTMLElement");
            }
            ref.current = element;
            registeredId.current = element.id;
            listenerRegistered.current = true;
            element.addEventListener("beforetoggle", beforeToggle);
            if (hasSetInitial.current) {
                setIsOpen(ref.current.matches(":popover-open"));
            }
        }
    }, []);
    (0, react_1.useEffect)(registerPopoverListener(ref.current, beforeToggle), [
        ref.current,
    ]);
    return {
        show,
        hide,
        toggle,
        control: refApplier,
        isOpen,
        id: registeredId.current,
    };
}
exports.usePopoverControls = usePopoverControls;
function registerPopoverListener(element, callback) {
    element === null || element === void 0 ? void 0 : element.addEventListener("beforetoggle", callback);
    return () => {
        element === null || element === void 0 ? void 0 : element.removeEventListener("beforetoggle", callback);
    };
}
exports.registerPopoverListener = registerPopoverListener;
function browserSupportsPopover() {
    // eslint-disable-next-line no-prototype-builtins
    return HTMLElement.prototype.hasOwnProperty("popover");
}
exports.browserSupportsPopover = browserSupportsPopover;
let i = 0;
function generateId() {
    return `popover-${i++}`;
}
