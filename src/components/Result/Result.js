import React from 'react';
import "./Result.css"

export default function Result({ value }) { 

    return (
        <>
        <span className='result-tilte'>Result: </span>
        <div className='result'>
            {value}
        </div>
        </>
    )
}