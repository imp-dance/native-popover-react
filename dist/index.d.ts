import React from "react";
export declare function NativePopover(props: {
    trigger: (props: {
        popovertarget: string;
    }) => React.ReactNode;
    popover: (props: {
        id: string;
        popover: string;
    }, closeProps: {
        popovertarget: string;
        popovertargetaction: string;
    }) => React.ReactNode;
    type?: "auto" | "manual";
    id?: string;
}): React.JSX.Element;
