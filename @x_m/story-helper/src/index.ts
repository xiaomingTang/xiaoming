type SelectValue = number | string

interface ArgController {
  boolean: {
    return: boolean
    defaultValue?: boolean
  }
  number: {
    return: number
    defaultValue?: number
    min?: number
    max?: number
    step?: number
  }
  range: {
    return: [number, number]
    defaultValue?: number
    min?: number
    max?: number
    step?: number
  }
  object: {
    return: object
    defaultValue?: object
  }
  file: {
    return: string[]
    accept?: string
  }
  radio: {
    return?: SelectValue
    defaultValue?: SelectValue
    options?: SelectValue[]
  }
  'inline-radio': {
    return?: SelectValue
    defaultValue?: SelectValue
    options?: SelectValue[]
  }
  check: {
    return: SelectValue[]
    defaultValue?: SelectValue[]
    options?: SelectValue[]
  }
  'inline-check': {
    return: SelectValue[]
    defaultValue?: SelectValue[]
    options?: SelectValue[]
  }
  select: {
    return?: SelectValue
    defaultValue?: SelectValue
    options?: SelectValue[]
  }
  'multi-select': {
    return?: SelectValue[]
    defaultValue?: SelectValue[]
    options?: SelectValue[]
  }
  text: {
    return: string
    defaultValue?: string
  }
  color: {
    return: string
    presetsColors?: string[]
    defaultValue?: number
  }
  date: {
    return: string
    defaultValue?: string
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
