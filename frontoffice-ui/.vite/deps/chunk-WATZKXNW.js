import {
  useFormControl
} from "./chunk-TYN7LOMV.js";
import {
  ButtonBase_default
} from "./chunk-7WZQ3EPZ.js";
import {
  useControlled_default
} from "./chunk-HZMJJFSC.js";
import {
  capitalize_default
} from "./chunk-MHR6PJSD.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  refType_default,
  rootShouldForwardProp_default,
  styled_default
} from "./chunk-VVNYS2KA.js";
import {
  require_jsx_runtime
} from "./chunk-M3YY4SUK.js";
import {
  require_prop_types
} from "./chunk-KSVC6TPA.js";
import {
  require_react
} from "./chunk-7JZAKNLV.js";
import {
  __toESM
} from "./chunk-2TUXWMP5.js";

// node_modules/@mui/material/internal/SwitchBase.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/internal/switchBaseClasses.js
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
var switchBaseClasses = generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);

// node_modules/@mui/material/internal/SwitchBase.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize_default(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
var SwitchBaseRoot = styled_default(ButtonBase_default)({
  padding: 9,
  borderRadius: "50%",
  variants: [{
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === "start" && ownerState.size !== "small",
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === "end" && ownerState.size !== "small",
    style: {
      marginRight: -12
    }
  }]
});
var SwitchBaseInput = styled_default("input", {
  shouldForwardProp: rootShouldForwardProp_default
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
var SwitchBase = React.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled_default({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsxs)(SwitchBaseRoot, {
    component: "span",
    className: clsx_default(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    tabIndex: null,
    role: void 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState,
    ref,
    ...other,
    children: [(0, import_jsx_runtime.jsx)(SwitchBaseInput, {
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      className: classes.input,
      disabled,
      id: hasLabelFor ? id : void 0,
      name,
      onChange: handleInputChange,
      readOnly,
      ref: inputRef,
      required,
      ownerState,
      tabIndex,
      type,
      ...type === "checkbox" && value === void 0 ? {} : {
        value
      },
      ...inputProps
    }), checked ? checkedIcon : icon]
  });
});
true ? SwitchBase.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: import_prop_types.default.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types.default.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: import_prop_types.default.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * @ignore
   */
  defaultChecked: import_prop_types.default.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: import_prop_types.default.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: import_prop_types.default.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: import_prop_types.default.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /*
   * @ignore
   */
  name: import_prop_types.default.string,
  /**
   * @ignore
   */
  onBlur: import_prop_types.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types.default.func,
  /**
   * @ignore
   */
  onFocus: import_prop_types.default.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: import_prop_types.default.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.object,
  /**
   * @ignore
   */
  tabIndex: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  /**
   * The input component prop `type`.
   */
  type: import_prop_types.default.string.isRequired,
  /**
   * The value of the component.
   */
  value: import_prop_types.default.any
} : void 0;
var SwitchBase_default = SwitchBase;

export {
  SwitchBase_default
};
//# sourceMappingURL=chunk-WATZKXNW.js.map
