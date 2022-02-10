import React from 'react';

export const DropdownFilter = ({ children, openOff }) => {
    return (
        <div>
            { openOff.official && children}
        </div>
    )
};
