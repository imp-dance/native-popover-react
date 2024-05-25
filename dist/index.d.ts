import React from "react";
export declare function NativePopover<T extends HTMLElement = HTMLElement>(props: {
    trigger: (props: {
        popovertarget: string;
        id: string;
    }) => React.ReactNode;
    popover: (props: {
        id: string;
        popover: string;
        ref?: (element: T | null) => void;
        anchor?: string;
    }, closeProps: {
        popovertarget: string;
        popovertargetaction: string;
    }) => React.ReactNode;
    type?: "auto" | "manual";
    id?: string;
    control?: (element: T | null) => void;
    anchor?: boolean;
}): React.JSX.Element;
export declare function usePopoverControls<T extends HTMLElement = HTMLElement>(args?: {
    throwOnError?: boolean;
    onError?: (error: string) => void;
}): {
    show: () => void;
    hide: () => void;
    toggle: () => boolean | void;
    control: (element: T | null) => void;
    isOpen: boolean;
    id: string | null;
};
export declare function registerPopoverListener(element: HTMLElement | undefined | null, callback: (event: Event) => void): () => void;
export declare function browserSupportsPopover(): boolean;
