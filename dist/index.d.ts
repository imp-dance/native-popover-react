import React from "react";
export declare function NativePopover<T extends HTMLElement = HTMLElement>(props: {
    trigger: (props: {
        popovertarget: string;
    }) => React.ReactNode;
    popover: (props: {
        id: string;
        popover: string;
        ref?: (element: T | null) => void;
    }, closeProps: {
        popovertarget: string;
        popovertargetaction: string;
    }) => React.ReactNode;
    type?: "auto" | "manual";
    id?: string;
    control?: (element: T | null) => void;
}): React.JSX.Element;
export declare function usePopoverControls<T extends HTMLElement = HTMLElement>(): {
    show: () => void;
    hide: () => void;
    toggle: () => void;
    control: (element: T | null) => void;
    isOpen: boolean;
};
