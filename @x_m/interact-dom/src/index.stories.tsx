import { Meta } from "@storybook/react";
import { createSBArgs, StoryOutputArgs } from "@x_m/story-helper"
import { useEffect, useRef } from "react";
import InteractDomComp from './index'

const controlArgs = createSBArgs({
  enableMove: {
    control: 'boolean',
    defaultValue: true,
  },
  enableScale: {
    control: 'boolean',
    defaultValue: true,
  },
  enableRotate: {
    control: 'boolean',
    defaultValue: true,
  },
  ratioOfMove: {
    control: 'number',
    defaultValue: 1,
    max: 1,
    min: 3,
    step: 0.1,
  },
  ratioOfScale: {
    control: 'number',
    defaultValue: 1.1,
    max: 1,
    min: 3,
    step: 0.1,
  },
  ratioOfRotate: {
    control: 'number',
    defaultValue: 15,
    max: 1,
    min: 60,
    step: 3,
  },
  mouseButtonOfMove: {
    control: 'select',
    defaultValue: 0,
    options: [
      0, 1, 2, 3, 4,
    ],
  },
  mouseButtonOfScale: {
    control: 'radio',
    defaultValue: "middle-button-only",
    options: [
      "shift-required",
      "middle-button-only",
    ],
  },
})

const meta: Meta<typeof controlArgs> = {
  title: 'interact-dom',
  argTypes: controlArgs,
}

export default meta

/**
 * 此处使用 StoryOutputArgs,
 * 则其内的 args 能提示各个属性, 及值的类型
 */
export const InteractDom = (args: StoryOutputArgs<typeof controlArgs>) => {
  const ref = useRef<HTMLDivElement>(null)
  const interact = new InteractDomComp()

  useEffect(() => {
    const elem = ref.current

    if (elem) {
      const onChange = () => {
        elem.style.transform = interact.formatToCss()
      }

      elem.style.transform = ''
      interact.attach(elem)

      if (interact.mouseFormatter) {
        interact.mouseFormatter.enableMove = args.enableMove
        interact.mouseFormatter.enableScale = args.enableScale
        interact.mouseFormatter.enableRotate = args.enableRotate
        interact.mouseFormatter.ratioOfMove = args.ratioOfMove
        interact.mouseFormatter.ratioOfScale = args.ratioOfScale
        interact.mouseFormatter.ratioOfRotate = args.ratioOfRotate
        interact.mouseFormatter.mouseButtonOfMove = args.mouseButtonOfMove as any
        interact.mouseFormatter.mouseButtonOfScale = args.mouseButtonOfScale as any
      }
      
      interact.addListener('change', onChange)
      return () => {
        interact.detach()
        interact.removeListener('change', onChange)
      }
    }
  }, [args])

  return (
    <div
      ref={ref}
      /**
       * 不建议直接写 style, 建议引用样式文件, 写到 className 中
       */
      style={{
        /**
         * 随便什么 position 都可以
         */
        position: 'fixed',
        width: '100px',
        height: '100px',
        background: 'gray',
      }}
    />
  )
}
