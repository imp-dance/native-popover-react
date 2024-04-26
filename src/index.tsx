import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function NativePopover<
  T extends HTMLElement = HTMLElement
>(props: {
  trigger: (props: { popovertarget: string }) => React.ReactNode;
  popover: (
    props: {
      id: string;
      popover: string;
      ref?: (element: T | null) => void;
    },
    closeProps: {
      popovertarget: string;
      popovertargetaction: string;
    }
  ) => React.ReactNode;
  type?: "auto" | "manual";
  id?: string;
  control?: (element: T | null) => void;
}) {
  const id = useRef(generateId());
  if (props.id) {
    id.current = props.id;
  }
  return (
    <>
      {props.trigger({ popovertarget: id.current })}
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
>() {
  const ref = useRef<T | null>(null);
  const listenerRegistered = useRef<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    if (!supportsPopover()) {
      return apiSupportWarning();
    }
    if (ref.current && "showPopover" in ref.current) {
      ref.current.showPopover();
    } else {
      return noRefWarning();
    }
  };

  const hide = () => {
    if (!supportsPopover()) {
      return apiSupportWarning();
    }
    if (ref.current && "hidePopover" in ref.current) {
      ref.current.hidePopover();
    } else {
      return noRefWarning();
    }
  };

  const toggle = () => {
    if (!supportsPopover()) {
      return apiSupportWarning();
    }
    if (ref.current && "togglePopover" in ref.current) {
      ref.current.togglePopover();
    } else {
      return noRefWarning();
    }
  };

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

  const refApplier = (element: T | null) => {
    if (element) {
      ref.current = element;
      listenerRegistered.current = true;
      element.addEventListener("beforetoggle", beforeToggle);
    }
  };

  useEffect(() => {
    if (ref.current) {
      setIsOpen(ref.current.matches(":popover-open"));
      ref.current.addEventListener("beforetoggle", beforeToggle);
    }
    return () => {
      if (ref.current && listenerRegistered.current) {
        ref.current.removeEventListener(
          "beforetoggle",
          beforeToggle
        );
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

function apiSupportWarning() {
  console.warn("Popover API is not supported in your browser");
}

function noRefWarning() {
  console.warn(
    "Ref is not registered, popover controls will not work"
  );
}

function supportsPopover() {
  // eslint-disable-next-line no-prototype-builtins
  return HTMLElement.prototype.hasOwnProperty("popover");
}

let i = 0;
function generateId() {
  return `popover-${i++}`;
}
