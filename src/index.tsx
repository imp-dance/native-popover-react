import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function NativePopover<
  T extends HTMLElement = HTMLElement
>(props: {
  trigger: (props: {
    popovertarget: string;
    id: string;
  }) => React.ReactNode;
  popover: (
    props: {
      id: string;
      popover: string;
      ref?: (element: T | null) => void;
      anchor?: string;
    },
    closeProps: {
      popovertarget: string;
      popovertargetaction: string;
    }
  ) => React.ReactNode;
  type?: "auto" | "manual";
  id?: string;
  control?: (element: T | null) => void;
  anchor?: {
    top?: "top" | "bottom";
    bottom?: "top" | "bottom";
    left?: "left" | "right";
    right?: "left" | "right";
  };
}) {
  const anchorId = useIncrID();
  const id = useIncrID();
  if (props.id) {
    id.current = props.id;
  }

  const anchorName = `--anchor${anchorId.current}`;

  const triggerProps: {
    popovertarget: string;
    id: string;
    style?: CSSProperties;
  } = {
    popovertarget: id.current,
    id: anchorId.current,
  };
  if (props.anchor) {
    triggerProps.style = { anchorName } as CSSProperties;
  }

  const popoverProps: {
    id: string;
    popover: string;
    ref?: (element: T | null) => void;
    anchor?: string;
    style?: CSSProperties;
  } = {
    id: id.current,
    popover: props.type ?? "auto",
    ref: props.control,
    anchor: props.anchor ? anchorId.current : undefined,
  };
  if (props.anchor) {
    popoverProps.style = {
      positionAnchor: anchorName,
      top: props.anchor.top
        ? `anchor(${anchorName} ${props.anchor.top})`
        : undefined,
      bottom: props.anchor.bottom
        ? `anchor(${anchorName} ${props.anchor.bottom})`
        : undefined,
      left: props.anchor.left
        ? `anchor(${anchorName} ${props.anchor.left})`
        : undefined,
      right: props.anchor.right
        ? `anchor(${anchorName} ${props.anchor.right})`
        : undefined,
      margin: 0,
    } as CSSProperties;
  }

  return (
    <>
      {props.trigger(triggerProps)}
      {props.popover(popoverProps, {
        popovertarget: id.current,
        popovertargetaction: "hide",
      })}
    </>
  );
}

const errors = {
  notSupported: "Popover API is not supported in your browser",
  notMounted:
    "Target element is not mounted, or does not support popover API",
};

export function usePopoverControls<
  T extends HTMLElement = HTMLElement
>(args?: {
  throwOnError?: boolean;
  onError?: (error: string) => void;
}) {
  const hasSetInitial = useRef(false);
  const registeredId = useRef<string | null>(null);
  const ref = useRef<T | null>(null);
  const listenerRegistered = useRef<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const createError = (error: string) => {
    if (args?.onError) {
      args.onError(error);
    }
    if (args?.throwOnError) {
      throw new Error(error);
    } else {
      console.error(errors);
    }
  };

  const show = useCallback(() => {
    if (!browserSupportsPopover()) {
      return createError(errors.notSupported);
    }

    if (!ref.current || !("showPopover" in ref.current))
      return createError(errors.notMounted);

    return ref.current.showPopover();
  }, []);

  const hide = useCallback(() => {
    if (!browserSupportsPopover()) {
      return createError(errors.notSupported);
    }
    if (!ref.current || !("togglePopover" in ref.current))
      return createError(errors.notMounted);

    return ref.current.hidePopover();
  }, []);

  const toggle = useCallback(() => {
    if (!browserSupportsPopover()) {
      return createError(errors.notSupported);
    }
    if (!ref.current || !("togglePopover" in ref.current))
      return createError(errors.notMounted);

    return ref.current.togglePopover();
  }, []);

  const beforeToggle = useCallback(
    (event: Event) => {
      if ("newState" in event && event.newState === "open") {
        setIsOpen(true);
      }
      if ("newState" in event && event.newState === "closed") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  const refApplier = useCallback((element: T | null) => {
    if (element) {
      if (!(element instanceof HTMLElement)) {
        return createError(
          "Element passed to ref is not an HTMLElement"
        );
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

  useEffect(registerPopoverListener(ref.current, beforeToggle), [
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

export function registerPopoverListener(
  element: HTMLElement | undefined | null,
  callback: (event: Event) => void
) {
  element?.addEventListener("beforetoggle", callback);
  return () => {
    element?.removeEventListener("beforetoggle", callback);
  };
}

export function browserSupportsPopover() {
  // eslint-disable-next-line no-prototype-builtins
  return HTMLElement.prototype.hasOwnProperty("popover");
}

let i = 0;
function useIncrID() {
  const [id] = useState(() => ({ current: `npopoverr${i++}` }));
  return id;
}
