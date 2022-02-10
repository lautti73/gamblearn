import React, { useState } from 'react';
import web3 from '../ethereum/web3';
import { EnterGambleForm } from './EnterGambleForm';
import { ManageGamble } from './ManageGamble';
import { ProgressBar } from './ProgressBar';
import { ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/solid';

export const GambleBody = ({ gambleAddress, firstTeam, secondTeam, description, players, balance, manager, firstTeamCount, completed, completedByWinner, winnerEth, completedDate, type, subtype }) => {

    const [clipboard, setClipboard] = useState(false);

    let completedDateFormated;
    if (completed) {
        const date = new Date(completedDate * 1000)
        completedDateFormated = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes()  }`
    }

    console.log(completedDateFormated)

    return (
        <main className='flex-col items-center sm:container mx-5 sm:mx-auto mt-8 mb-24'>
            <div className='relative flex flex-col items-center bg-white shadow-sm shadow-gray-300 rounded p-10 container sm:container'>
                <p className='font-bold sm:text-5xl text-3xl mb-8 text-blackfont text-center'> { `${firstTeam} vs ${secondTeam}` } </p>
                <div className='max-w-7xl mb-2 pb-6 sm:px-10 px-2 border-b-2 border-solid border-gray-600 flex flex-col text-center'>
                    <p className=''>{`Description: ${ description }`}</p>
                </div>
                <p className='sm:text-lg mt-2 mb-2 text-center'> There are <span className='font-bold'>{ `${players.length} people` }</span> gambling </p>
                <p className='sm:text-lg mb-2 text-center'> The pool reward for this is <span className='font-bold'>{ `${web3.utils.fromWei( balance, 'ether' )}`} <span className='text-sm font-bold'>ETH</span></span></p>
                <div className='w-full max-w-screen-sm flex justify-center items-center my-2'>

                    <ProgressBar
                            total={ players.length }
                            firstTeamCount={ firstTeamCount }
                            secondTeamCount={ players.length - firstTeamCount }
                    />
                </div>
                
                
                <EnterGambleForm
                    gambleAddress={ gambleAddress }
                    firstTeam={ firstTeam }
                    secondTeam={ secondTeam }
                    completed={ completed }
                />
                <p className='lg:absolute block sm:bottom-16 sm:right-10 font-bold sm:text-lg mt-6'>{ type }</p>
                <p className='lg:absolute block sm:bottom-10 sm:right-10 text-sm sm:text-base'>{ subtype }</p>
                <p className='mt-3 mb-6 text-center hidden sm:block'> The manager of this gamble is: <span className='font-medium'>{ manager }</span> </p>
                <p className='mt-8 mb-8 sm:hidden text-center '>The manager of this gamble is:
                    <div className='flex flex-wrap justify-center items-center' onClick={ () => { navigator.clipboard.writeText(manager); setClipboard(true) } }>
                        <span className='block font-medium ml-2'>{ `${ manager.slice(0, 4)}...${manager.slice(-5)}` } </span>
                        { !clipboard && <ClipboardCopyIcon className='w-5 h-5 ml-2 text-blackfont'/> }
                        { clipboard && <ClipboardCheckIcon className='w-5 h-5 ml-2 text-green'/> }
                    </div>
                </p>
                
                { 
                    completed && 
                    <div className='mt-6 '>
                        <p className='text-green text-center'>{ completedByWinner
                        ? `The gamble finished at ${ completedDateFormated }, the winner team is ${ winnerEth }.` 
                        : `The gamble was canceled on ${ completedDateFormated }` }
                        </p>
                    </div> 
                }
            </div>
                
            <ManageGamble
                manager={ manager }
                gambleAddress={ gambleAddress }
                firstTeam={ firstTeam }
                secondTeam={ secondTeam }
                completed={ completed }
            />
            
        </main>
    )
};
