import type { Meta, Story } from "@storybook/react";

import { EventEmitter as EventEmitterComponent } from "./index";

export default {
  title: "event-emitter",
} as Meta<{}>;

const Template: Story<{}> = (args) => (
  <div>
    storybook of EventEmitter: {EventEmitterComponent}
  </div>
);

export const EventEmitter = Template.bind({});
