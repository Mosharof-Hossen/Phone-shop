import React, { useEffect } from 'react'
import Menu from './Menu';

export default function Layout(props) {
    let { title, className, children } = props
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <div>
            <div className="mb-3">
                <Menu></Menu>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}
