/// <sreference types="vite/client" />
import 'vite/client'

export default null
declare global {
  interface Window {
    registration: any
  }
}
declare let self: ServiceWorkerGlobalScope
