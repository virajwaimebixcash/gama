import {
  useRadioGroup
} from "./chunk-TSO5Z6YK.js";
import {
  SwitchBase_default
} from "./chunk-WATZKXNW.js";
import {
  useFormControl
} from "./chunk-TYN7LOMV.js";
import {
  createSimplePaletteValueFilter
} from "./chunk-TAPUFPH2.js";
import {
  createChainedFunction_default
} from "./chunk-BIZ5UR4Z.js";
import {
  createSvgIcon
} from "./chunk-772DP3BF.js";
import {
  memoTheme_default
} from "./chunk-O7ZB5CRT.js";
import {
  capitalize_default
} from "./chunk-MHR6PJSD.js";
import {
  useDefaultProps
} from "./chunk-IJLS2J4V.js";
import {
  alpha,
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

// node_modules/@mui/material/Radio/Radio.js
var React4 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/material/Radio/RadioButtonIcon.js
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/internal/svg-icons/RadioButtonUnchecked.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var RadioButtonUnchecked_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked");

// node_modules/@mui/material/internal/svg-icons/RadioButtonChecked.js
var React2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var RadioButtonChecked_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked");

// node_modules/@mui/material/Radio/RadioButtonIcon.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var RadioButtonIconRoot = styled_default("span", {
  shouldForwardProp: rootShouldForwardProp_default
})({
  position: "relative",
  display: "flex"
});
var RadioButtonIconBackground = styled_default(RadioButtonUnchecked_default)({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)"
});
var RadioButtonIconDot = styled_default(RadioButtonChecked_default)(memoTheme_default(({
  theme
}) => ({
  left: 0,
  position: "absolute",
  transform: "scale(0)",
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest
  }),
  variants: [{
    props: {
      checked: true
    },
    style: {
      transform: "scale(1)",
      transition: theme.transitions.create("transform", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest
      })
    }
  }]
})));
function RadioButtonIcon(props) {
  const {
    checked = false,
    classes = {},
    fontSize
  } = props;
  const ownerState = {
    ...props,
    checked
  };
  return (0, import_jsx_runtime3.jsxs)(RadioButtonIconRoot, {
    className: classes.root,
    ownerState,
    children: [(0, import_jsx_runtime3.jsx)(RadioButtonIconBackground, {
      fontSize,
      className: classes.background,
      ownerState
    }), (0, import_jsx_runtime3.jsx)(RadioButtonIconDot, {
      fontSize,
      className: classes.dot,
      ownerState
    })]
  });
}
true ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: import_prop_types.default.oneOf(["small", "medium"])
} : void 0;
var RadioButtonIcon_default = RadioButtonIcon;

// node_modules/@mui/material/Radio/radioClasses.js
function getRadioUtilityClass(slot) {
  return generateUtilityClass("MuiRadio", slot);
}
var radioClasses = generateUtilityClasses("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary", "sizeSmall"]);
var radioClasses_default = radioClasses;

// node_modules/@mui/material/Radio/Radio.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    color,
    size
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize_default(color)}`, size !== "medium" && `size${capitalize_default(size)}`]
  };
  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes)
  };
};
var RadioRoot = styled_default(SwitchBase_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.size !== "medium" && styles[`size${capitalize_default(ownerState.size)}`], styles[`color${capitalize_default(ownerState.color)}`]];
  }
})(memoTheme_default(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${radioClasses_default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  },
  variants: [{
    props: {
      color: "default",
      disabled: false,
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disabled: false,
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disabled: false
    },
    style: {
      [`&.${radioClasses_default.checked}`]: {
        color: (theme.vars || theme).palette[color].main
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      "&:hover": {
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
})));
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
var defaultCheckedIcon = (0, import_jsx_runtime4.jsx)(RadioButtonIcon_default, {
  checked: true
});
var defaultIcon = (0, import_jsx_runtime4.jsx)(RadioButtonIcon_default, {});
var Radio = React4.forwardRef(function Radio2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiRadio"
  });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = "medium",
    className,
    disabled: disabledProp,
    disableRipple = false,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  disabled ?? (disabled = false);
  const ownerState = {
    ...props,
    disabled,
    disableRipple,
    color,
    size
  };
  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();
  let checked = checkedProp;
  const onChange = createChainedFunction_default(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;
  if (radioGroup) {
    if (typeof checked === "undefined") {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === "undefined") {
      name = radioGroup.name;
    }
  }
  return (0, import_jsx_runtime4.jsx)(RadioRoot, {
    type: "radio",
    icon: React4.cloneElement(icon, {
      fontSize: defaultIcon.props.fontSize ?? size
    }),
    checkedIcon: React4.cloneElement(checkedIcon, {
      fontSize: defaultCheckedIcon.props.fontSize ?? size
    }),
    disabled,
    ownerState,
    classes,
    name,
    checked,
    onChange,
    ref,
    className: clsx_default(classes.root, className),
    ...other
  });
});
true ? Radio.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: import_prop_types2.default.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: import_prop_types2.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types2.default.object,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types2.default.string]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: import_prop_types2.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: import_prop_types2.default.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: import_prop_types2.default.node,
  /**
   * The id of the `input` element.
   */
  id: import_prop_types2.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: import_prop_types2.default.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType_default,
  /**
   * Name attribute of the `input` element.
   */
  name: import_prop_types2.default.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: import_prop_types2.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: import_prop_types2.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: import_prop_types2.default.oneOfType([import_prop_types2.default.oneOf(["medium", "small"]), import_prop_types2.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: import_prop_types2.default.any
} : void 0;
var Radio_default = Radio;

export {
  getRadioUtilityClass,
  radioClasses_default,
  Radio_default
};
//# sourceMappingURL=chunk-D3N5ZMZC.js.map
