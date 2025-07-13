interface clickWidget {
    type?: 'clickable' | 'coordinate',
    widget: UiSelector,
    timeout?: number
}

interface UiObject_attribute {
    clickable?: boolean,
    accessibilityFocused?: boolean,
    checked?: boolean,
    column?: number,
    columnCount?: number,
    columnSpan?: number,
    contextClickable?: boolean,
    depth?: number,
    dismissable?: boolean,
    drawingOrder?: number,
    editable?: boolean,
    enabled?: boolean,
    focusable?: boolean,
    indexInParent?: number,
    longClickable?: boolean,
    row?: number,
    rowCount?: number,
    rowSpan?: number,
    scrollable?: boolean,
    selected?: boolean,
    text?: string,
    textContains?: string,
    desc?: string,
    descContains?: string,
    id?: string,
    idContains?: string,
    textMatches?: string | RegExp,
    idMatches?: string | RegExp,
    fullId?: string,
    bounds?: Rect,
    className?: string,
    packageName?: string,
    password?: boolean,
}

declare module '*.png' {
    const content: string;
    export default content;
}