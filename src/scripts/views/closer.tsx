import * as u from '../utils'

import * as m from './misc'

/**
 * Triggers a callback on Escape and on click events originating outside its
 * "root", which is typically a parent component. Useful for closing a dropdown
 * or a popup. Usage:
 *   ...
 *   ref = React.createRef()
 *   ...
 *   render() {
 *     return {
 *       <div ref={this.ref}>
 *         <Closer root={this.ref.current} close={this.close}>
 *           ... content ...
 *         </Closer>
 *       </div>
 *     }
 *   }
 */

type CloserProps = {
  root : null | Element,
  close: (event: KeyboardEvent | MouseEvent) => void,
}

export class Closer extends m.ViewComponent<CloserProps> {
  unKeyDown: () => void = () => {}
  unClick: () => void = () => {}

  onKeyDown = (event: Event) => {
    const {props: {close}} = this
    if (
      event instanceof KeyboardEvent &&
      u.eventKeyCode(event) === u.KEY_NAMES_US.ESCAPE
    ) {
      close(event)
    }
  }

  onClick = (event: Event) => {
    const {props: {root, close}} = this
    if (
      event instanceof MouseEvent &&
      !u.isAncestorOf(root, event.target)
    ) {
      close(event)
    }
  }

  componentDidMount() {
    this.unKeyDown = u.addEvent(window, 'keydown', this.onKeyDown)
    this.unClick = u.addEvent(window, 'click', this.onClick)
  }

  componentWillUnmount() {
    this.unKeyDown()
    this.unClick()
  }

  render() {
    const {props: {children}} = this
    return children
  }
}
