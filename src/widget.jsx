import { createRoot } from 'react-dom/client'
import App from './App'
import { PortalContext } from './PortalContext'
import appCss from './App.css?inline'
import indexCss from './index.scss?inline'

// :root rules in indexCss don't match anything inside a shadow tree (there's
// no root element in here), so without this, inheritable properties like
// color/font leak in from whatever page embeds the widget instead.
const HOST_RESET = `
:host {
  all: initial;
  display: block;
  color: #6b6375;
  font: 18px/145% system-ui, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 0.18px;
}
`

const STYLE_TEXT = `${HOST_RESET}\n${appCss}\n${indexCss}`

class FoodWaterCalculatorElement extends HTMLElement {
  connectedCallback() {
    if (this._root) return

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = STYLE_TEXT
    shadow.appendChild(style)

    const mount = document.createElement('div')
    shadow.appendChild(mount)

    this._root = createRoot(mount)
    this._root.render(
      <PortalContext.Provider value={shadow}>
        <App />
      </PortalContext.Provider>
    )
  }

  disconnectedCallback() {
    this._root?.unmount()
    this._root = null
  }
}

if (!customElements.get('food-water-calculator')) {
  customElements.define('food-water-calculator', FoodWaterCalculatorElement)
}
