# native-popover-react

> Utilize the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) in React

```tsx
import { NativePopover } from "native-popover-react";

function App() {
  return (
    <NativePopover
      trigger={(props) => (
        <button {...props}>Open tooltip</button>
      )}
      popover={(props) => (
        <div {...props} className="my-popover">
          Popover content
        </div>
      )}
    />
  );
}
```

## Controls

```tsx
import {
  NativePopover,
  usePopoverControls,
} from "native-popover-react";

function App() {
  const popover = usePopoverControls<HTMLDivElement>();

  return (
    <div>
      <button onClick={popover.toggle}>
        {popover.isOpen ? "Close popover" : "Open popover"}
      </button>
      <NativePopover
        control={popover.control}
        popover={(props) => (
          <div {...props} className="my-popover">
            Popover content
          </div>
        )}
      />
    </div>
  );
}
```

### Closing popover

You can close the popover using `usePopoverControls`, or by utilizing the second argument in the `popover` prop to create a close button:

```tsx
<NativePopover
  trigger={(props) => <button {...props}>Toggle</button>}
  popover={(props, closeProps) => (
    <div {...props} className="my-popover">
      Popover content
      <button {...closeProps}>X</button>
    </div>
  )}
/>
```

## Anchoring

> [!WARNING]  
> **Experimental**: This might not be supported in all modern browsers yet.

Enable an [anchor](https://developer.chrome.com/blog/introducing-popover-api#anchor_positioning) between `trigger` and `popover`.

```tsx
import {
  NativePopover,
  usePopoverControls,
} from "native-popover-react";

function App() {
  const popover = usePopoverControls<HTMLDivElement>();

  return (
    <div>
      <NativePopover
        anchor
        control={popover.control}
        trigger={(props) => <button {...props}>Toggle</button>}
        popover={(props) => (
          <div
            {...props}
            style={{
              bottom: "anchor(bottom)",
              left: "anchor(center)",
            }}
          >
            Popover content
          </div>
        )}
      />
    </div>
  );
}
```
