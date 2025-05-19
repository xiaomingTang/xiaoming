import path from 'path'
import fs from 'fs'

export function toAbsPath(
  filePath: string,
  basePath: string = process.cwd()
): string {
  if (path.isAbsolute(filePath)) {
    return filePath
  }
  return path.resolve(basePath, filePath)
}

export function readSslFile(filePath: string, type: 'key' | 'cert') {
  const absPath = toAbsPath(filePath)
  try {
    return fs.readFileSync(absPath, 'utf8')
  } catch (_) {
    const SSL_CMD =
      'openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 -subj "/CN=ssl-proxy/O=ssl-proxy"'

    throw new Error(
      `Failed to read ${type} file: ${absPath};
make sure the file exists and is readable.
If you don't have the file, you can generate a self-signed certificate using the following command:
${SSL_CMD}`
    )
  }
}
