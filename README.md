# native-popover-react

> Utilize the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) with React

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

## Reference

```typescript
function NativePopover<
  T extends HTMLElement = HTMLElement
>(props: {
  /** Spread props on a container for the popover content. **/
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
  /** Props should be applied to a `button` or `input` element **/
  trigger?: (props: {
    popovertarget: string;
  }) => React.ReactNode;
  type?: "auto" | "manual";
  id?: string;
  /** Returned from `usePopoverControls().control` **/
  control?: React.MutableRefObject<T | null>;
}): ReactNode;

function usePopoverControls<
  T extends HTMLElement = HTMLElement
>(options?: {
  onStateChange?: (newState: "open" | "closed") => void;
}): {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  control: React.MutableRefObject<T | null>;
  isOpen: boolean;
};
```
