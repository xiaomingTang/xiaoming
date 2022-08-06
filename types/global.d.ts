interface InputDeviceCapabilitiesInit {
  /**
   * @default false
   */
  firesTouchEvents: boolean;
};

interface InputDeviceCapabilities {
  readonly firesTouchEvents: boolean;
};


declare global {
  interface Window {
    /**
     * you MUST require/import inputdevicecapabilities-polyfill if you want to use this
     */
    InputDeviceCapabilities?: new (deviceInitDict?: InputDeviceCapabilitiesInit) => InputDeviceCapabilities;
  }
  interface UIEvent {
    /**
     * you MUST require/import inputdevicecapabilities-polyfill if you want to use this
     */
    readonly sourceCapabilities?: InputDeviceCapabilities;
  }
}

export {}
