import { VElementNode, VNode, DOMNodeType } from '../VDOM.type'


const renderElementNode = (vNode: VElementNode) => {
    const $el = document.createElement(vNode.tagName)
    Object
        .keys(vNode.attrs)
        .forEach(key => {
            $el.setAttribute(key, (vNode.attrs as any)[key])
        })
    for (const child of vNode.children) {
        $el.appendChild(render(child))
    }
    return $el
}

const renderTextNode = (vNode: string) => {
    return document.createTextNode(vNode)
}

const render = (vNode: VNode) => {
    if (typeof vNode === 'string') {
        return renderTextNode(vNode)
    }
    return renderElementNode(vNode)
}

const mount = ($node: DOMNodeType, target: DOMNodeType | Element | null) => {
    if (target) {
        target.replaceWith($node)
        return $node
    } else {
        throw "can't find target element,mount failed"
    }

}

export { render, mount }