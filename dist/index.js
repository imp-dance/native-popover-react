"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativePopover = void 0;
const react_1 = __importDefault(require("react"));
let i = 0;
function generateId() {
    return `popover-${i++}`;
}
function NativePopover(props) {
    var _a;
    const id = react_1.default.useRef(generateId());
    if (props.id) {
        id.current = props.id;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.trigger({ popovertarget: id.current }),
        props.popover({ id: id.current, popover: (_a = props.type) !== null && _a !== void 0 ? _a : "auto" }, {
            popovertarget: id.current,
            popovertargetaction: "hide",
        })));
}
exports.NativePopover = NativePopover;
