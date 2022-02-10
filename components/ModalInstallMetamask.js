import React from 'react';
import { XIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import metamaskPic from '../public/metamask-icon.png';

export const ModalInstallMetamask = ({ setInstallMetamask, installMetamask }) => {

    return (
        <>  
            <div className='w-11/12 sm:w-2/3 md:w-7/12 xl:w-1/3 2xl:w-1/4 h-3/4 md:h-4/6 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 z-20   bg-white rounded text-black overflow-auto'>
                <div className='w-full h-full relative py-6 px-6'>
                    <XIcon className='w-6 h-6 absolute top-2 right-2 cursor-pointer' onClick={ () => setInstallMetamask(false) }/>
                    <div className='w-full h-full flex flex-col'>
                        <div className='flex flex-col items-center h-full p-2'>
                            <p className='font-bold text-3xl mb-8 text-center'> Please Install Metamask </p>
                            <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es' target='_blank' rel='noreferrer' className='mt-16 sm:mt-20 2xl:mt-24'>
                                <Image src={metamaskPic} alt='Metamask Wolf Icon' width={ 185 } height={ 185 }  />
                            </a>
                            <p className='mt-auto text-center'>
                                {`Note: To download Metamask you can go to the `}
                                <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es' target='_blank' rel='noreferrer' className='underline'>
                                    official Chrome Extension
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-10' onClick={ () => setInstallMetamask(false) }></div>
        </>
        )
};


