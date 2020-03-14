interface VElementNode {
    tagName: string
    attrs: object
    children: Array<VNode>
}

type VNode = VElementNode | string
type DOMNodeType = HTMLElement | Text

interface VDOMBuilderOption {
    attrs?: object
    children?: Array<VNode>
}

export { VElementNode, VNode, VDOMBuilderOption, DOMNodeType }