import Link from 'next/link';
import React from 'react';
import web3 from '../ethereum/web3';


import { ProgressBar } from './ProgressBar';

export const GambleContainer = ({ gambleAddress ,firstTeam, secondTeam, players, balance, completed, type, subtype }) => {

    if (completed) return null;

    let firstTeamCount = 0;

    players.forEach(element => { 
        if (element[1] === firstTeam) {
            firstTeamCount += 1
        }
    });
    

    return (

            <div className='flex flex-col items-center relative py-4 mb-5 bg-white shadow-md shadow-gray-400 rounded '>
                <p className='font-bold text-xl text-blackfont mb-2'> { `${firstTeam} vs ${secondTeam}` } </p>
                <p> There are <span className='font-bold'>{ `${players.length} people` }</span> gambling </p>
                <p> The pool reward for this is <span className='font-bold'>{ `${web3.utils.fromWei( balance, 'ether' )} `}<span className='text-sm font-bold'>ETH</span>  </span></p>
                <ProgressBar 
                    total={ players.length }
                    firstTeamCount={ firstTeamCount }
                    secondTeamCount={ players.length - firstTeamCount }

                />
                <Link href={`/gambles/${gambleAddress}`}>
                    <a className='text-white font-medium bg-green px-5 py-1 mt-4 rounded hover:brightness-110 active:brightness-95'>Bet</a> 
                </Link>
                <p className='absolute sm:bottom-8 bottom-4 right-4 font-medium sm:text-sm text-xs '>{ type }</p>
                <p className='absolute bottom-4 right-4 font-medium text-xs hidden sm:block'>{ subtype }</p>
            </div>
        
    )
};
