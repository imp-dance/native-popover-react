import React from "react";
export declare function NativePopover<T extends HTMLElement = HTMLElement>(props: {
    trigger?: (props: {
        popovertarget: string;
    }) => React.ReactNode;
    popover: (props: {
        id: string;
        popover: string;
        ref?: React.MutableRefObject<T | null>;
    }, closeProps: {
        popovertarget: string;
        popovertargetaction: string;
    }) => React.ReactNode;
    type?: "auto" | "manual";
    id?: string;
    control?: React.MutableRefObject<T | null>;
}): React.JSX.Element;
export declare function usePopoverControls<T extends HTMLElement = HTMLElement>(options?: {
    onStateChange?: (newState: "open" | "closed") => void;
}): {
    show: () => void;
    hide: () => void;
    toggle: () => void;
    control: React.MutableRefObject<T | null>;
    isOpen: boolean;
};
