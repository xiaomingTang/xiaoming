type OptionsValue = number | string

type InputArg<T> = {
  return: T
  name?: string
  defaultValue: T
}

interface NumberArg {
  min?: number
  max?: number
  step?: number
}

interface OptionsArg {
  options: OptionsValue[]
}

interface ArgController {
  boolean: InputArg<boolean>
  number: InputArg<number> & NumberArg
  range: InputArg<[number, number]> & NumberArg
  object: InputArg<object>
  radio: InputArg<OptionsValue> & OptionsArg
  'inline-radio': InputArg<OptionsValue> & OptionsArg
  select: InputArg<OptionsValue> & OptionsArg
  check: InputArg<OptionsValue[]> & OptionsArg
  'inline-check': InputArg<OptionsValue[]> & OptionsArg
  'multi-select': InputArg<OptionsValue[]> & OptionsArg
  text: InputArg<string>
  date: InputArg<string>
  color: InputArg<string> & {
    presetsColors?: string[]
  }
  file: {
    return: string[]
    name?: string
    accept?: string
  }
}

type ArgItem<T extends keyof ArgController> = {
  control: T
} & Omit<ArgController[T], 'return'>

export interface StoryInputArgs {
  [key: string]:
    | ArgItem<'boolean'>
    | ArgItem<'check'>
    | ArgItem<'color'>
    | ArgItem<'date'>
    | ArgItem<'file'>
    | ArgItem<'inline-check'>
    | ArgItem<'inline-radio'>
    | ArgItem<'multi-select'>
    | ArgItem<'number'>
    | ArgItem<'object'>
    | ArgItem<'radio'>
    | ArgItem<'range'>
    | ArgItem<'select'>
    | ArgItem<'text'>
}

export type StoryOutputArgs<T extends StoryInputArgs> = {
  [key in keyof T]: ArgController[T[key]['control']]['return']
}

export function createSBArgs<T extends StoryInputArgs>(args: T): T {
  return args
}

console.log('test-ci-5')
