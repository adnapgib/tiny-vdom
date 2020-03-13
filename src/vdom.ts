interface VDOM {
    tagName: string
    attrs: object
    children: Array<VDOM>
}

interface VDOMBuilderOption {
    attrs?: object
    children?: Array<VDOM>
}

const createElement = (
    tagName: string,
    options?: VDOMBuilderOption
) => {
    const attrs = options?.attrs || {}
    const children = options?.children || []
    return {
        tagName: tagName,
        attrs: attrs,
        children: children
    } as VDOM
}

const renderElementNode = (vNode: VDOM) => {
    const $el = document.createElement(vNode.tagName)
    Object
        .keys(vNode.attrs)
        .forEach(key => {
            $el.setAttribute(key, (vNode.attrs as any)[key])
        })
    for (const child of vNode.children) {
        $el.appendChild(renderElementNode(child))
    }
    return $el
}

const render = (vNode: VDOM) => {

}


export { createElement, renderElementNode }