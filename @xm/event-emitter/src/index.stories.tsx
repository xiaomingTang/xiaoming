import type { Meta } from "@storybook/react";
import { createSBArgs, StoryOutputArgs } from "@xm/story-helper";

import { EventEmitter as EventEmitterComponent } from "./index";

const controlArgs = createSBArgs({
  boolean: {
    control: 'boolean',
    defaultValue: true,
  },
  radio: {
    control: 'radio',
    options: ['radio-1', 'radio-2'],
    defaultValue: 'radio-1',
  },
  text: {
    control: 'text',
    defaultValue: '123',
  },
  check: {
    control: 'check',
    options: ['check-1', 'check-2', 'check-3'],
    defaultValue: ['check-1'],
  },
})

type Args = typeof controlArgs

const meta: Meta<Args> = {
  title: 'event-emitter',
}

export default meta

const Template = (args: StoryOutputArgs<typeof controlArgs>) => (
  <div>
    <p>storybook of EventEmitter: {EventEmitterComponent}</p>
    <p>control.boolean: {`${args.boolean}`}</p>
    <p>control.radio: {args.radio}</p>
    <p>control.text: {args.text}</p>
    <p>control.check: {args.check}</p>
  </div>
)

export const StoryHelperTest = Template.bind(controlArgs);
