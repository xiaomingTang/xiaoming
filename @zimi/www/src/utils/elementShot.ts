import html2canvas, { Options as Html2CanvasOptions } from 'html2canvas'
import { createPortal, render } from 'react-dom'

const ELEMENT_SHOT_CONTAINER_ID = 'ELEMENT_SHOT_CONTAINER_ID'

function getContainer() {
  if (typeof document === 'undefined') {
    return null
  }
  const oldContainer = document.getElementById(ELEMENT_SHOT_CONTAINER_ID)
  if (oldContainer) {
    return oldContainer
  }
  const element = document.createElement('div')
  element.id = ELEMENT_SHOT_CONTAINER_ID
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.top = '-9999px'
  document.body.appendChild(element)
  return element
}

export async function elementShot(
  element: JSX.Element,
  options?: Html2CanvasOptions
) {
  const container = getContainer()
  if (!container) {
    throw new Error('container not exist')
  }
  container.innerHTML = ''
  const portal = createPortal(element, container)
  render(portal, document.createElement('div'))
  return html2canvas(container, options)
}
