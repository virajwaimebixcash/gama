import {
  Typography_default
} from "./chunk-H6ZWU6N5.js";
import {
  FormControlContext_default,
  useFormControl
} from "./chunk-TYN7LOMV.js";
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
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
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

// node_modules/@mui/material/InputAdornment/InputAdornment.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/InputAdornment/inputAdornmentClasses.js
function getInputAdornmentUtilityClass(slot) {
  return generateUtilityClass("MuiInputAdornment", slot);
}
var inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", ["root", "filled", "standard", "outlined", "positionStart", "positionEnd", "disablePointerEvents", "hiddenLabel", "sizeSmall"]);
var inputAdornmentClasses_default = inputAdornmentClasses;

// node_modules/@mui/material/InputAdornment/InputAdornment.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _span;
var overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, styles[`position${capitalize_default(ownerState.position)}`], ownerState.disablePointerEvents === true && styles.disablePointerEvents, styles[ownerState.variant]];
};
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePointerEvents,
    hiddenLabel,
    position,
    size,
    variant
  } = ownerState;
  const slots = {
    root: ["root", disablePointerEvents && "disablePointerEvents", position && `position${capitalize_default(position)}`, variant, hiddenLabel && "hiddenLabel", size && `size${capitalize_default(size)}`]
  };
  return composeClasses(slots, getInputAdornmentUtilityClass, classes);
};
var InputAdornmentRoot = styled_default("div", {
  name: "MuiInputAdornment",
  slot: "Root",
  overridesResolver
})(memoTheme_default(({
  theme
}) => ({
  display: "flex",
  maxHeight: "2em",
  alignItems: "center",
  whiteSpace: "nowrap",
  color: (theme.vars || theme).palette.action.active,
  variants: [{
    props: {
      variant: "filled"
    },
    style: {
      [`&.${inputAdornmentClasses_default.positionStart}&:not(.${inputAdornmentClasses_default.hiddenLabel})`]: {
        marginTop: 16
      }
    }
  }, {
    props: {
      position: "start"
    },
    style: {
      marginRight: 8
    }
  }, {
    props: {
      position: "end"
    },
    style: {
      marginLeft: 8
    }
  }, {
    props: {
      disablePointerEvents: true
    },
    style: {
      pointerEvents: "none"
    }
  }]
})));
var InputAdornment = React.forwardRef(function InputAdornment2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiInputAdornment"
  });
  const {
    children,
    className,
    component = "div",
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp,
    ...other
  } = props;
  const muiFormControl = useFormControl() || {};
  let variant = variantProp;
  if (variantProp && muiFormControl.variant) {
    if (true) {
      if (variantProp === muiFormControl.variant) {
        console.error("MUI: The `InputAdornment` variant infers the variant prop you do not have to provide one.");
      }
    }
  }
  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }
  const ownerState = {
    ...props,
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents,
    position,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(FormControlContext_default.Provider, {
    value: null,
    children: (0, import_jsx_runtime.jsx)(InputAdornmentRoot, {
      as: component,
      ownerState,
      className: clsx_default(classes.root, className),
      ref,
      ...other,
      children: typeof children === "string" && !disableTypography ? (0, import_jsx_runtime.jsx)(Typography_default, {
        color: "textSecondary",
        children
      }) : (0, import_jsx_runtime.jsxs)(React.Fragment, {
        children: [position === "start" ? (
          /* notranslate needed while Google Translate will not fix zero-width space issue */
          _span || (_span = (0, import_jsx_runtime.jsx)("span", {
            className: "notranslate",
            "aria-hidden": true,
            children: "​"
          }))
        ) : null, children]
      })
    })
  });
});
true ? InputAdornment.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the `input` on click.
   * @default false
   */
  disablePointerEvents: import_prop_types.default.bool,
  /**
   * If children is a string then disable wrapping in a Typography component.
   * @default false
   */
  disableTypography: import_prop_types.default.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: import_prop_types.default.oneOf(["end", "start"]).isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: import_prop_types.default.oneOf(["filled", "outlined", "standard"])
} : void 0;
var InputAdornment_default = InputAdornment;

export {
  getInputAdornmentUtilityClass,
  inputAdornmentClasses_default,
  InputAdornment_default
};
//# sourceMappingURL=chunk-7INULBZD.js.map
