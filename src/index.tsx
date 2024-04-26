import React from "react";

let i = 0;
function generateId() {
  return `popover-${i++}`;
}

export function NativePopover(props: {
  trigger: (props: { popovertarget: string }) => React.ReactNode;
  popover: (
    props: {
      id: string;
      popover: string;
    },
    closeProps: {
      popovertarget: string;
      popovertargetaction: string;
    }
  ) => React.ReactNode;
  type?: "auto" | "manual";
  id?: string;
}) {
  const id = React.useRef(generateId());
  if (props.id) {
    id.current = props.id;
  }
  return (
    <>
      {props.trigger({ popovertarget: id.current })}
      {props.popover(
        { id: id.current, popover: props.type ?? "auto" },
        {
          popovertarget: id.current,
          popovertargetaction: "hide",
        }
      )}
    </>
  );
}
