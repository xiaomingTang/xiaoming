/* eslint-disable max-classes-per-file */
interface RawRemoteError {
  /**
   * code > 0 才是合法的 Error;
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  code: number
  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  name: string
  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  message: string
}

/**
 * name 和 message 都是 human readable 的字符串,
 * 仅用于调试和展示,
 * 程序逻辑判断请使用 code
 */
export class RemoteError extends Error {
  /**
   * code > 0 才是合法的 Error;
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  code = 1

  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  constructor(message: string) {
    super(message)
    this.name = 'RemoteError'
  }

  toJson(): RawRemoteError {
    return {
      code: this.code,
      name: this.name,
      message: this.message,
    }
  }

  toString() {
    return JSON.stringify(this.toJson())
  }

  valueOf() {
    return `${this.name} [${this.code}]: ${this.message}`
  }

  static fromError(err: unknown) {
    if (typeof err === 'string') {
      return new RemoteError(err)
    }
    if (!err) {
      return new RemoteError('Unknown error')
    }
    const json = err as Partial<RawRemoteError>
    const error = new RemoteError(
      typeof json.message === 'string' ? json.message : 'Unknown error'
    )
    if (typeof json.code === 'number' && json.code > 0) {
      error.code = json.code
    }
    if (json.name && typeof json.name === 'string') {
      error.name = json.name
    }
    return error
  }

  static isRemoteError(data: unknown): data is RawRemoteError {
    const json = data as Partial<RawRemoteError>
    return (
      !!json &&
      typeof json === 'object' &&
      typeof json.code === 'number' &&
      json.code > 0 &&
      typeof json.name === 'string' &&
      typeof json.message === 'string'
    )
  }
}

/**
 * name 和 message 都是 human readable 的字符串,
 * 仅用于调试和展示,
 * 程序逻辑判断请使用 code
 */
export class RemoteTimeoutError extends RemoteError {
  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  static code = 2

  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  code = 2

  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  constructor(message: string) {
    super(message)
    this.name = 'RemoteTimeoutError'
  }
}

/**
 * name 和 message 都是 human readable 的字符串,
 * 仅用于调试和展示,
 * 程序逻辑判断请使用 code
 */
export class RemoteNotFoundError extends RemoteError {
  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  static code = 3

  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  code = 3

  /**
   * name 和 message 都是 human readable 的字符串,
   * 仅用于调试和展示,
   * 程序逻辑判断请使用 code
   */
  constructor(message: string) {
    super(message)
    this.name = 'RemoteNotFoundError'
  }
}

export const response = {
  success<T>(data: T) {
    return {
      code: 0,
      data,
    } as const
  },

  error(error: RemoteError) {
    return error.toJson()
  },
}
