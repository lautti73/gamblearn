import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


export const ActiveLink = ({ children, href, lg }) => {

    const router = useRouter();

    let style;

    if (lg) {
        style = {
            borderBottom: router.asPath === href ? '3px solid #F0B90B' : '',
            color: router.asPath === href ? '#F0B90B' : ''
        }
    } else {
        style = {
            borderBottom: router.asPath === href ? '3px solid #F0B90B' : '',
            color: router.asPath === href ? '#F0B90B' : ''
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        router.push( href )
    }


    return (
        <Link href={ href } onClick={ handleClick }> 
            <a className='lg:pb-5 pb-1 sm:px-2 px-0.5' style={ style }>
                { children }
            </a>
        </Link>
    )
};
