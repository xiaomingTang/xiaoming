'use server'

import { S } from './string'
import commonConfig from './common.json'
import developmentConfig from './development.json'
import productionConfig from './production.json'

type AppEnv = 'production' | 'development'
const APP_ENV_LIST: AppEnv[] = ['production', 'development']

let localConfig: Partial<typeof commonConfig> = {}

try {
  // eslint-disable-next-line global-require
  localConfig = require('./local.json')
} catch (error) {
  // pass
}

/**
 * - server side 从 process.env.NEXT_PUBLIC_APP_ENV 中读取
 * - client side 从 window.NEXT_PUBLIC_APP_ENV 读取(通过 InjectEnv 写入到 script 中)
 */
export function getAppEnv(): AppEnv {
  const appEnv =
    typeof window === 'undefined'
      ? (S(process.env.NEXT_PUBLIC_APP_ENV) as AppEnv)
      : (window.NEXT_PUBLIC_APP_ENV as AppEnv)
  if (APP_ENV_LIST.includes(appEnv)) {
    return appEnv
  }
  console.warn(`app env incorrect: ${appEnv}`)
  return 'production'
}

function getEnvConfig(env: AppEnv): typeof commonConfig {
  return {
    ...commonConfig,
    ...(env === 'development' ? developmentConfig : {}),
    ...(env === 'production' ? productionConfig : {}),
    ...localConfig,
  }
}

const APP_ENV = getAppEnv()

export const ENV_CONFIG = {
  public: {
    appEnv: APP_ENV,
    nodeEnv: process.env.NODE_ENV,
    ...getEnvConfig(APP_ENV),
  },
  private: {},
}
