// Workaround: normalize empty renderer version to avoid semver parse error in React DevTools
if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  const patch = (orig) => {
    if (!orig) return orig;
    return function (...args) {
      try {
        const renderer = args[0];
        if (renderer && typeof renderer.version === 'string' && renderer.version === '') {
          renderer.version = '0.0.0';
        }
      } catch (e) {
        /* ignore */
      }
      return orig.apply(this, args);
    };
  };

  hook.registerRenderer = patch(hook.registerRenderer);
  hook.registerRendererInterface = patch(hook.registerRendererInterface);
}