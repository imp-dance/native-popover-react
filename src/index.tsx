import React, { useEffect, useRef, useState } from "react";

let i = 0;
function generateId() {
  return `popover-${i++}`;
}

export function NativePopover<
  T extends HTMLElement = HTMLElement
>(props: {
  trigger?: (props: {
    popovertarget: string;
  }) => React.ReactNode;
  popover: (
    props: {
      id: string;
      popover: string;
      ref?: React.MutableRefObject<T | null>;
    },
    closeProps: {
      popovertarget: string;
      popovertargetaction: string;
    }
  ) => React.ReactNode;
  type?: "auto" | "manual";
  id?: string;
  control?: React.MutableRefObject<T | null>;
}) {
  const id = useRef(generateId());
  if (props.id) {
    id.current = props.id;
  }
  return (
    <>
      {props.trigger
        ? props.trigger({ popovertarget: id.current })
        : null}
      {props.popover(
        {
          id: id.current,
          popover: props.type ?? "auto",
          ref: props.control,
        },
        {
          popovertarget: id.current,
          popovertargetaction: "hide",
        }
      )}
    </>
  );
}

export function usePopoverControls<
  T extends HTMLElement = HTMLElement
>(
  options: {
    onStateChange?: (newState: "open" | "closed") => void;
  } = {}
) {
  const ref = useRef<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    if (!supportsPopover()) {
      return console.error(
        "Popover API is not supported in your browser"
      );
    }
    if (ref.current && "showPopover" in ref.current) {
      ref.current.showPopover();
    } else {
      console.error(
        "Target element is not mounted, or does not support popover API"
      );
    }
  };

  const hide = () => {
    if (!supportsPopover()) {
      return console.error(
        "Popover API is not supported in your browser"
      );
    }
    if (ref.current && "hidePopover" in ref.current) {
      ref.current.hidePopover();
    } else {
      console.error(
        "Target element is not mounted, or does not support popover API"
      );
    }
  };

  const toggle = () => {
    if (!supportsPopover()) {
      return console.error(
        "Popover API is not supported in your browser"
      );
    }
    if (ref.current && "togglePopover" in ref.current) {
      ref.current.togglePopover();
    } else {
      console.error(
        "Target element is not mounted, or does not support popover API"
      );
    }
  };

  useEffect(() => {
    if (ref.current) {
      setIsOpen(ref.current.matches(":popover-open"));
      ref.current.addEventListener("beforetoggle", (event) => {
        if ("newState" in event && event.newState === "open") {
          setIsOpen(true);
          options.onStateChange?.("open");
        }
        if ("newState" in event && event.newState === "closed") {
          setIsOpen(false);
          options.onStateChange?.("closed");
        }
      });
    }
  }, []);

  return {
    show,
    hide,
    toggle,
    control: ref,
    isOpen,
  };
}

function supportsPopover() {
  return HTMLElement.prototype.hasOwnProperty("popover");
}
