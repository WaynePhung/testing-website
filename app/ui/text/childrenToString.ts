import React from "react";

export function childrenToString(children: React.ReactNode): string {
    return React.Children.toArray(children).reduce((acc: string, child) => {
        if (typeof child === 'string') {
            // console.log('acc from childrenToString: ' + acc);
            // console.log('child from childrenToString: ' + child);
            return acc + child;
        }
        if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
            // console.log('acc from childrenToString: ' + acc);
            // console.log('child.props.children from childrenToString: ' + child.props.children);
            return acc + childrenToString(child.props.children);
        }
        return acc;
    }, '');
}
