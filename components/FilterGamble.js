import { AdjustmentsIcon } from '@heroicons/react/solid';
import React, { useLayoutEffect, useRef, useState } from 'react';
import types from '../types/types';
import { FilterTypes } from './FilterTypes';
import { ModalFilters } from './ModalFilters';



export const FilterGamble = ({ setGamblesFiltered, getGambleByOfficial }) => {

    const official = useRef( true )

    const [openFilters, setOpenFilters] = useState(false);

    const handleChangeRadio= (e) => {
        if (e.target.value == 'official') {
            official.current = true
        } else {
            official.current = false
        }
        setGamblesFiltered(getGambleByOfficial(official.current))
    }
    
    const getGambleByType = (type) => {
            const officialGambles = getGambleByOfficial(official.current)
            return officialGambles.filter( (el) => el.type == type)
    }

    const getGambleBySubType = (subtype) => {
        const officialGambles = getGambleByOfficial(official.current)
        return officialGambles.filter( (el) => el.subtype == subtype )
    }

    useLayoutEffect(() => {
        if (openFilters) {
          document.body.style.overflow = "hidden";
          document.body.style.height = "100%";
        }
        if (!openFilters) {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }
      }, [openFilters]);

    return (
            <div>
                <div className='mb-6 px-2.5 py-2 bg-white rounded shadow-md shadow-gray-300 lg:hidden'>
                    <div className='flex items-center justify-center' onClick={ () => { setOpenFilters( true ) }}>
                        <AdjustmentsIcon className='w-5 h-5 rotate-90 mr-1'/>
                        <p className='font-bold'>Filters</p>
                    </div>
                </div>
                <aside className='w-80 px-6 py-6 mr-5 bg-white shadow-md shadow-gray-400 rounded hidden lg:block'>
                        <div className='official'>
                            <div className='mb-2'>
                                <input type='radio' name='filter' className='mr-2' checked={ official.current } value='official' onChange={ handleChangeRadio }/>
                                <label>Official</label>
                            </div>
                            <div>
                                <input type='radio' name='filter' className='mr-2' checked={ !official.current } value='notOfficial' onChange={ handleChangeRadio }/>
                                <label>No-official</label>
                            </div>  
                        </div>
                        <div className='types mt-12'>
                        {
                            Object.keys(types).map( (el, i)  => {
                                return <FilterTypes 
                                    key={ i }
                                    type={ el }
                                    getGambleBySubType= { getGambleBySubType }
                                    getGambleByType={ getGambleByType }
                                    setGamblesFiltered={ setGamblesFiltered }
                                />
                            })
                        }
                        </div>
                </aside>
                { openFilters && <ModalFilters setOpenFilters={ setOpenFilters }>

                        <div className='official mt-4 text-xl'>
                            <div className='mb-2'>
                                <input type='radio' name='filter2' className='mr-2' checked={ official.current } value='official' onChange={ handleChangeRadio }/>
                                <label>Official</label>
                            </div>
                            <div>
                                <input type='radio' name='filter2' className='mr-2' value='notOfficial' checked={ !official.current } onChange={ handleChangeRadio }/>
                                <label>No-official</label>
                            </div>  
                        </div>
                        <div className='types mt-12 text-xl'>
                        {
                            Object.keys(types).map( (el, i)  => {
                                return <FilterTypes
                                    key={ i }
                                    type={ el }
                                    getGambleBySubType= { getGambleBySubType }
                                    getGambleByType={ getGambleByType }
                                    setGamblesFiltered={ setGamblesFiltered }
                                />
                            })
                        }
                        </div>
                </ModalFilters> }
        
            </div>
    )
};
