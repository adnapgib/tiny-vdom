import { VNode, VDOMBuilderOption } from '../VDOM.type'

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
    } as VNode
}

export { createElement } 
