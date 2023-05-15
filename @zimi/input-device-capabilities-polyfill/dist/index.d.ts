/**
 * inputdevicecapabilities-polyfill.js - https://github.com/WICG/InputDeviceCapabilities
 *
 * Uses a (not perfectly accurate) heuristic to implement
 * UIEvent.sourceCapabilities and InputDeviceCapabilities.firesTouchEvents.
 * Assumptions:
 *   - If sourceCapabilities is consulted on an event, it will be first read within
 *     one second of the original event being dispatched.  We could, instead,
 *     determine the sourceCapabilities as soon as any UIEvent is dispatched (eg.
 *     by hooking addEventListener) but that woudln't work for legacy onevent
 *     style handlers.
 *   - Touch and non-touch input devices aren't both being used within one
 *     second of eachother.  Eg. if you tap the screen then quickly move the
 *     mouse, we may incorrectly attribute the mouse movement to the touch
 *     device.
 *
 *  Browser support:
 *   - Verified working on:
 *     - Chrome 43 (Windows, Linux and Android)
 *     - IE 11 (Windows)
 *     - Firefox 38 (Linux)
 *     - Safari 8 (Mac and iOS)
 *   - Event constructors aren't supported by IE at all.
 *   - IE on Windows phone isn't supported properly (https://github.com/WICG/InputDeviceCapabilities/issues/13)
 *   - Won't work in IE prior to version 9 (due to lack of Object.defineProperty)
 */

interface InputDeviceCapabilitiesInit {
  /**
   * @default false
   */
  firesTouchEvents: boolean;
}

interface InputDeviceCapabilities {
  readonly firesTouchEvents: boolean;
}


declare global {
  interface Window {
    InputDeviceCapabilities: new (deviceInitDict?: InputDeviceCapabilitiesInit) => InputDeviceCapabilities;
  }
  interface UIEvent {
    readonly sourceCapabilities: InputDeviceCapabilities;
  }
}

export {}
