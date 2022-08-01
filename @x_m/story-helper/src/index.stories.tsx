import type { Meta } from "@storybook/react"

const meta: Meta<{}> = {
  title: 'story-helper',
}

export default meta

const Template = () => (<>
  Doc 内点击 <em>show code</em> 查看详情
</>)

export const Index = Template.bind({})

// @ts-ignore
Index.parameters = {
  docs: {
    source: {
      language: 'tsx',
      type: 'auto',
      code: `
import { createSBArgs, StoryOutputArgs } from "@x_m/story-helper"

const controlArgs = createSBArgs({
  paramRadio: {
    /**
     * 此处, 编辑器能提示所有 control 类型
     */
    control: 'radio',
    /**
     * 根据不同 control 类型, 能提示不同的属性;
     * 如 radio 还有 options 属性, number 还有 min / max / step 等属性;
     */
    options: ['radio-1', 'radio-2'],
    defaultValue: 'radio-1',
  },
  paramText: {
    control: 'text',
    defaultValue: '123',
  },
  paramCheck: {
    control: 'check',
    options: ['check-1', 'check-2', 'check-3'],
    defaultValue: ['check-1'],
  },
})

const meta: Meta<typeof controlArgs> = {
  title: 'what-ever',
}

export default meta

/**
 * 此处使用 StoryOutputArgs,
 * 则其内的 args 能提示各个属性, 及值的类型
 */
const Template = (args: StoryOutputArgs<typeof controlArgs>) => (
  <div>
    <p>control.paramRadio: {args.paramRadio}</p>
    <p>control.paramText: {args.paramText}</p>
    <p>control.paramCheck: {args.paramCheck}</p>
  </div>
)

export const WhatEver = Template.bind(controlArgs)
      `
    },
  },
}
