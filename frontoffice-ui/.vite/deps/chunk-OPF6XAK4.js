import {
  RadioGroupContext_default
} from "./chunk-TSO5Z6YK.js";
import {
  FormGroup_default
} from "./chunk-OQ3XBSK4.js";
import {
  useId_default
} from "./chunk-XMNY7UBD.js";
import {
  useControlled_default
} from "./chunk-HZMJJFSC.js";
import {
  useForkRef_default
} from "./chunk-JEKHR3QG.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses
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

// node_modules/@mui/material/RadioGroup/RadioGroup.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/RadioGroup/radioGroupClasses.js
function getRadioGroupUtilityClass(slot) {
  return generateUtilityClass("MuiRadioGroup", slot);
}
var radioGroupClasses = generateUtilityClasses("MuiRadioGroup", ["root", "row", "error"]);
var radioGroupClasses_default = radioGroupClasses;

// node_modules/@mui/material/RadioGroup/RadioGroup.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (props) => {
  const {
    classes,
    row,
    error
  } = props;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getRadioGroupUtilityClass, classes);
};
var RadioGroup = React.forwardRef(function RadioGroup2(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    children,
    className,
    defaultValue,
    name: nameProp,
    onChange,
    value: valueProp,
    ...other
  } = props;
  const rootRef = React.useRef(null);
  const classes = useUtilityClasses(props);
  const [value, setValueState] = useControlled_default({
    controlled: valueProp,
    default: defaultValue,
    name: "RadioGroup"
  });
  React.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector("input:not(:disabled):checked");
      if (!input) {
        input = rootRef.current.querySelector("input:not(:disabled)");
      }
      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = useForkRef_default(ref, rootRef);
  const name = useId_default(nameProp);
  const contextValue = React.useMemo(() => ({
    name,
    onChange(event) {
      setValueState(event.target.value);
      if (onChange) {
        onChange(event, event.target.value);
      }
    },
    value
  }), [name, onChange, setValueState, value]);
  return (0, import_jsx_runtime.jsx)(RadioGroupContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime.jsx)(FormGroup_default, {
      role: "radiogroup",
      ref: handleRef,
      className: clsx_default(classes.root, className),
      ...other,
      children
    })
  });
});
true ? RadioGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types.default.any,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: import_prop_types.default.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: import_prop_types.default.func,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: import_prop_types.default.any
} : void 0;
var RadioGroup_default = RadioGroup;

export {
  getRadioGroupUtilityClass,
  radioGroupClasses_default,
  RadioGroup_default
};
//# sourceMappingURL=chunk-OPF6XAK4.js.map
