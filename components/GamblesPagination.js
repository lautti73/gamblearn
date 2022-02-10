import React, { useEffect, useRef, useState } from 'react'
import { GambleContainer } from './GambleContainer'
import { PageNumbers } from './PageNumbers';

export const GamblesPagination = ({ gamblesFiltered }) => {

    const [pageNumber, setPageNumber] = useState(1);

    const [pagination, setPagination] = useState({
        gambles: gamblesFiltered,
        currentPage: pageNumber,
        gamblesPerPage: 20,
    });

    
    useEffect(() => {
        setPagination({
            ...pagination,
            gambles: gamblesFiltered
        })
      
    }, [gamblesFiltered])

    useEffect(() => {
        setPagination({
            ...pagination,
            currentPage: pageNumber
        })
      
    }, [pageNumber])

    const { gambles, currentPage, gamblesPerPage } = pagination;

    const indexOfLastGamble = currentPage * gamblesPerPage;
    const indexOfFirstGamble = indexOfLastGamble - gamblesPerPage;
    const currentGambles = gambles.slice(indexOfFirstGamble, indexOfLastGamble);
    const currentGamblesReversed = currentGambles.reverse();
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(gambles.length / gamblesPerPage); i++) {
        pageNumbers.push(i);
    }

    let showPages = [];
    if (pageNumber === 1) {
        showPages = pageNumbers.slice(pageNumber - 1, pageNumber + 2)
    } else if (pageNumber === pageNumbers.length) {
        showPages = pageNumbers.slice(-3)
    } else {
        showPages = pageNumbers.slice(pageNumber - 2, pageNumber + 1)
    }
    
    


    

    return (
        <>
        
        {
            currentGamblesReversed.map( ( gmb, i ) => {
                return (
                    <GambleContainer
                        key={ i }
                        gambleAddress={ gmb.gambleAddress }
                        firstTeam={ gmb.firstTeam }
                        secondTeam={ gmb.secondTeam }
                        players={ gmb.players }
                        balance={ gmb.balance }
                        completed={ gmb.completed }
                        official={ gmb.official }
                        type={ gmb.type }
                        subtype={ gmb.subtype }
                    />
                )
            })
        }
        <ul className='w-fit mt-24 flex self-center justify-center border rounded border-solid border-gray-300 shadow-sm shadow'>
            <button className='px-2 py-1 bg-white rounded-l disabled:cursor-not-allowed border-r border-solid border-gray-300' onClick={ () => setPageNumber( pageNumber - 1)  } disabled={ currentPage === 1 } >Prev</button>
        { 
            
            showPages.map( (number) => {
                return (
                    <PageNumbers
                        key={ number }
                        id={ number }
                        pagination={ pagination }
                        setPageNumber={ setPageNumber }
                    />
                )
            } )
        }
            <button className='px-2 py-1 bg-white rounded-r disabled:cursor-not-allowed' disabled={ pageNumber === Math.max(...pageNumbers) } onClick={ () => setPageNumber( pageNumber + 1)  }>Next</button>
        </ul>
        
        </>
    )
}
