# native-popover-react

> Utilize the [native web Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) with React

```tsx
<NativePopover
  trigger={(props) => <button {...props}>Open tooltip</button>}
  popover={(props) => (
    <div {...props} className="my-popover">
      Popover content
    </div>
  )}
/>
```
