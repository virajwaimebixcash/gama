// node_modules/@mui/material/transitions/utils.js
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
    easing: style.transitionTimingFunction ?? (typeof easing === "object" ? easing[options.mode] : easing),
    delay: style.transitionDelay
  };
}

export {
  reflow,
  getTransitionProps
};
//# sourceMappingURL=chunk-LOZHJMDH.js.map
