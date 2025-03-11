import {
  pickersTextFieldClasses
} from "./chunk-QAQCXQAC.js";
import {
  Stack_default,
  stackClasses_default
} from "./chunk-3Q5NACAX.js";
import {
  textFieldClasses_default
} from "./chunk-R37IRL3E.js";
import "./chunk-TCTUZX4F.js";
import "./chunk-D7O3ABTW.js";
import "./chunk-EABWUSK2.js";
import "./chunk-CGLRNKQW.js";
import "./chunk-PUTJRVAO.js";
import "./chunk-GEVLYRWP.js";
import "./chunk-GHCNRXW7.js";
import "./chunk-IBNNLO4G.js";
import "./chunk-LOZHJMDH.js";
import "./chunk-VZAKHW2J.js";
import {
  Typography_default
} from "./chunk-H6ZWU6N5.js";
import "./chunk-D42MDP65.js";
import "./chunk-OIRH5LTY.js";
import "./chunk-BCIWU46Y.js";
import "./chunk-TSTOFQAE.js";
import "./chunk-OUWUCN5Y.js";
import "./chunk-AOW7Q6QM.js";
import "./chunk-VEGYWZOM.js";
import "./chunk-IBWUGY4Z.js";
import "./chunk-TYN7LOMV.js";
import "./chunk-FZKMR22M.js";
import "./chunk-TAPUFPH2.js";
import "./chunk-PF2VR3Y5.js";
import "./chunk-TMKJMMJP.js";
import "./chunk-2WOH4S5W.js";
import "./chunk-BIZ5UR4Z.js";
import "./chunk-XMNY7UBD.js";
import "./chunk-F6BGC7VB.js";
import "./chunk-KXIE6Z4Z.js";
import "./chunk-772DP3BF.js";
import "./chunk-HZMJJFSC.js";
import "./chunk-4Q4IEUKN.js";
import "./chunk-JEKHR3QG.js";
import "./chunk-O7ZB5CRT.js";
import "./chunk-MHR6PJSD.js";
import "./chunk-C6QWPPUH.js";
import "./chunk-6WK5VF4T.js";
import "./chunk-IJLS2J4V.js";
import "./chunk-VVNYS2KA.js";
import {
  require_jsx_runtime
} from "./chunk-M3YY4SUK.js";
import "./chunk-KSVC6TPA.js";
import {
  _extends
} from "./chunk-HQ6ZTAWL.js";
import "./chunk-YEGEUSQR.js";
import {
  require_react
} from "./chunk-7JZAKNLV.js";
import {
  __toESM
} from "./chunk-2TUXWMP5.js";

// node_modules/@mui/x-date-pickers/internals/demo/DemoContainer.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var getChildTypeFromChildName = (childName) => {
  if (childName.match(/^([A-Za-z]+)Range(Calendar|Clock)$/)) {
    return "multi-panel-UI-view";
  }
  if (childName.match(/^([A-Za-z]*)(DigitalClock)$/)) {
    return "Tall-UI-view";
  }
  if (childName.match(/^Static([A-Za-z]+)/) || childName.match(/^([A-Za-z]+)(Calendar|Clock)$/)) {
    return "UI-view";
  }
  if (childName.match(/^MultiInput([A-Za-z]+)RangeField$/) || childName.match(/^([A-Za-z]+)RangePicker$/)) {
    return "multi-input-range-field";
  }
  if (childName.match(/^SingleInput([A-Za-z]+)RangeField$/)) {
    return "single-input-range-field";
  }
  return "single-input-field";
};
var getSupportedSectionFromChildName = (childName) => {
  if (childName.includes("DateTime")) {
    return "date-time";
  }
  if (childName.includes("Date")) {
    return "date";
  }
  return "time";
};
function DemoItem(props) {
  const {
    label,
    children,
    component,
    sx: sxProp
  } = props;
  let spacing;
  let sx = sxProp;
  if (component && getChildTypeFromChildName(component) === "multi-input-range-field") {
    spacing = 1.5;
    sx = _extends({}, sx, {
      [`& .${textFieldClasses_default.root}`]: {
        flexGrow: 1
      }
    });
  } else {
    spacing = 1;
  }
  return (0, import_jsx_runtime.jsxs)(Stack_default, {
    direction: "column",
    alignItems: "stretch",
    spacing,
    sx,
    children: [label && (0, import_jsx_runtime.jsx)(Typography_default, {
      variant: "body2",
      children: label
    }), children]
  });
}
DemoItem.displayName = "DemoItem";
var isDemoItem = (child) => {
  if (React.isValidElement(child) && typeof child.type !== "string") {
    return child.type.displayName === "DemoItem";
  }
  return false;
};
function DemoContainer(props) {
  const {
    children,
    components,
    sx: sxProp
  } = props;
  const childrenTypes = /* @__PURE__ */ new Set();
  const childrenSupportedSections = /* @__PURE__ */ new Set();
  components.forEach((childName) => {
    childrenTypes.add(getChildTypeFromChildName(childName));
    childrenSupportedSections.add(getSupportedSectionFromChildName(childName));
  });
  const getSpacing = (direction2) => {
    if (direction2 === "row") {
      return childrenTypes.has("UI-view") || childrenTypes.has("Tall-UI-view") ? 3 : 2;
    }
    return childrenTypes.has("UI-view") ? 4 : 3;
  };
  let direction;
  let spacing;
  let extraSx = {};
  let demoItemSx = {};
  const sx = _extends({
    overflow: "auto",
    // Add padding as overflow can hide the outline text field label.
    pt: 1
  }, sxProp);
  if (components.length > 2 || childrenTypes.has("multi-input-range-field") || childrenTypes.has("single-input-range-field") || childrenTypes.has("multi-panel-UI-view") || childrenTypes.has("UI-view") || childrenSupportedSections.has("date-time")) {
    direction = "column";
    spacing = getSpacing("column");
  } else {
    direction = {
      xs: "column",
      lg: "row"
    };
    spacing = {
      xs: getSpacing("column"),
      lg: getSpacing("row")
    };
  }
  if (childrenTypes.has("UI-view")) {
  } else if (childrenTypes.has("single-input-range-field")) {
    if (!childrenSupportedSections.has("date-time")) {
      extraSx = {
        [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
          minWidth: 300
        }
      };
    } else {
      extraSx = {
        [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
          minWidth: {
            xs: 300,
            // If demo also contains MultiInputDateTimeRangeField, increase width to avoid cutting off the value.
            md: childrenTypes.has("multi-input-range-field") ? 460 : 400
          }
        }
      };
    }
  } else if (childrenSupportedSections.has("date-time")) {
    extraSx = {
      [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
        minWidth: 270
      }
    };
    if (childrenTypes.has("multi-input-range-field")) {
      demoItemSx = {
        [`& > .${stackClasses_default.root} > .${textFieldClasses_default.root}, & > .${stackClasses_default.root} > .${pickersTextFieldClasses.root}`]: {
          minWidth: 210
        }
      };
    }
  } else {
    extraSx = {
      [`& > .${textFieldClasses_default.root}, & > .${pickersTextFieldClasses.root}`]: {
        minWidth: 200
      }
    };
  }
  const finalSx = _extends({}, sx, extraSx);
  return (0, import_jsx_runtime.jsx)(Stack_default, {
    direction,
    spacing,
    sx: finalSx,
    children: React.Children.map(children, (child) => {
      if (React.isValidElement(child) && isDemoItem(child)) {
        return React.cloneElement(child, {
          sx: _extends({}, extraSx, demoItemSx)
        });
      }
      return child;
    })
  });
}
export {
  DemoContainer,
  DemoItem
};
//# sourceMappingURL=@mui_x-date-pickers_internals_demo.js.map
