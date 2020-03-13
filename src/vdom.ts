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


export { createElement }