export { Remote, isRemoteAdaptorData } from './remote'
export type { AdaptorPackageData, Adaptor } from './adaptor'
export {
  RemoteError,
  RemoteNotFoundError,
  RemoteTimeoutError,
  response,
} from './response'
export { createIframeAdaptor } from './adaptors/iframe'
export { createHttpAdaptor, remoteEventManager } from './adaptors/http'
