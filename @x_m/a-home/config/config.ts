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

function getAppEnv(): AppEnv {
  const appEnv = S(process.env.NEXT_PUBLIC_APP_ENV) as AppEnv
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
    ...getEnvConfig(APP_ENV),
  },
  private: {},
}
