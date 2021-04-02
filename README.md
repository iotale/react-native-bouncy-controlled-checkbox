## 说明

修改自 [react-native-bouncy-checkbox@2.0.0](https://github.com/WrathChaos/react-native-bouncy-checkbox)

将受控组件的状态由 `state` 自管理，转为通过 `props` 更新状态。方便与父组件进行交互。

```tsx
<BouncyControlledCheckbox
  checked={checked}
  onCheckPress={(checked) => {
    console.log(checked);
  }}
/>
```

## License

React Native Bouncy Checkbox is available under the MIT license. See the LICENSE file for more info.
