import { useRouter } from 'next/router';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Gamble from '../ethereum/gambleGame';
import web3 from '../ethereum/web3';
import { ModalInstallMetamask } from './ModalInstallMetamask';
import { ModalLoading } from './ModalLoading';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

export const ManageGamble = ({ gambleAddress, firstTeam, secondTeam, manager, completed}) => {

    const router = useRouter()

    const [winner, setWinner] = useState( firstTeam );

    const [errorForm, setErrorForm] = useState({
        errorManager: '',
        errorTeam: ''
    });

    const [loadingGamble, setLoadingGamble] = useState(false);

    const [isManager, setIsManager] = useState(false);

    const [transactionStatus, setTransactionStatus] = useState({
        status: 0,
        errorMessage: ''
    })

    const [installMetamask, setInstallMetamask] = useState(false)

    useEffect(() => {
        const isManager = async() => {
            const accounts = await web3.eth.getAccounts()
            if( accounts[0] == manager ) {
                setIsManager( true )
            }
        }
        isManager()
    
    }, []);

    useLayoutEffect(() => {
        if (loadingGamble) {
          document.body.style.overflow = "hidden";
          document.body.style.height = "100%";
        }
        if (!loadingGamble) {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }
      }, [loadingGamble]);

      useLayoutEffect(() => {
        if (installMetamask) {
          document.body.style.overflow = "hidden";
          document.body.style.height = "100%";
        }
        if (!installMetamask) {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }
    }, [installMetamask]);
    
    if (completed || !isManager ) return null;

    const handleChange = (e) => {
        setWinner( e.target.value )
    }

    const handleCancelGamble = async(e) => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts()
        if (accounts[0] == manager ) {

            if( accounts.length > 0 && ethereum.isConnected() ) {
                const gamble = Gamble( gambleAddress )
                try {
                    setLoadingGamble(true)
                    await gamble.methods.cancelGamble().send({
                         from: accounts[0]
                    })
                    setTransactionStatus({
                        status: 200,
                        errorMessage: ''
                    })
                    
                    router.replace(`/gambles/${gambleAddress}`)
                } catch (err) {
                    console.log(err)
                    setTransactionStatus({
                        status: 400,
                        errorMessage: err.message
                    })
                }
                
                setLoadingGamble(false)

            } else {
                if (typeof window.ethereum !== 'undefined' ) {
                    await window.ethereum.request({ method: 'eth_requestAccounts' })

                } else {
                    setInstallMetamask( true )
                }
            }

        } else {
            setErrorForm( {
                ...errorForm,
                errorManager: 'Only the manager of the gamble can execute this function'
            } )
        }
    }

    const handlePickWinner = async(e) => {
        e.preventDefault()
        const accounts = await web3.eth.getAccounts()
        if ( accounts[0] == manager ) {

            if (winner === firstTeam || winner === secondTeam) {
                if( accounts.length > 0 && ethereum.isConnected() ) {
                    const gamble = Gamble( gambleAddress )
                    try {
                        setLoadingGamble(true)
                        await gamble.methods.pickWinners( winner ).send({
                             from: accounts[0]
                        })
                        setTransactionStatus({
                            status: 200,
                            errorMessage: ''
                        })
                        
                        router.replace(`/gambles/${gambleAddress}`)
                    } catch (err) {
                        console.log(err)
                        setTransactionStatus({
                            status: 400,
                            errorMessage: err.message
                        })
                    }
                    
                    setLoadingGamble(false)
    
                } else {
                    if (typeof window.ethereum !== 'undefined' ) {
                        await window.ethereum.request({ method: 'eth_requestAccounts' })
    
                    } else {
                        setInstallMetamask( true )
                    }
                }
            } else {
                setErrorForm( {
                    ...errorForm,
                    errorTeam: 'Please choose a valid team'
                } )
            }
        } else {
            setErrorForm( {
                ...errorForm,
                errorManager: 'Only the manager of the gamble can execute this function'
            } )
        }
    }

    return (
        <div className='container mt-6 p-10 rounded shadow-sm shadow-gray-300 bg-white'>
            <form className='flex flex-col items-center'>
                <h2 className='font-bold text-2xl mb-8 text-blackfont'>Manager Panel</h2>
                <label className='block mb-4 text-center'>
                    Select winner:
                    <select className='px-3 py-1 ml-3 border border-solid border-gray-300 rounded text-sm mb-4' value={ winner } name={ 'winner' } onChange={ handleChange }>
                        <option value={ firstTeam }>{ firstTeam }</option>
                        <option value={ secondTeam }>{ secondTeam }</option>
                    </select>
                </label>
                { errorForm.errorManager && <p className='text-red-400 text-sm font-medium mb-3 text-center'> { errorForm.errorManager } </p> }
                { errorForm.errorTeam && <p className='text-red-400 text-sm font-medium mb-3 text-center'> { errorForm.errorTeam } </p> }
                <div className='flex flex-col sm:block items-center '>
                    <button className='h-9 text-red font-medium bg-white border-solid border border-red px-5 py-1 rounded mt-4 sm:mt-2 sm:mr-6 order-last hover:brightness-110 active:brightness-95' onClick={ handleCancelGamble }>Cancel gamble</button>
                    <button className='h-9 text-white font-medium bg-green px-5 py-1 rounded mt-2 hover:brightness-110 active:brightness-95' onClick={ handlePickWinner }>Pick winner</button>
                </div>
            </form>
            { 
                installMetamask && 
                <ModalInstallMetamask 
                    setInstallMetamask={ setInstallMetamask } 
                    installMetamask={ installMetamask }
                />}
            { 
                loadingGamble && 
                <ModalLoading 
                    setLoadingGamble={ setLoadingGamble }
                    loadingGamble={ loadingGamble } 
                /> }

            {
            transactionStatus.status == 200 && 
            <div className='flex sm:justify-center items-center mt-12'>
                <CheckCircleIcon className='w-6 h-6 mr-1 text-green'/>
            <p className='text-green font-medium text-sm sm:text-base text-center'>  {`Your transaction has succeed `}
            </p>
            </div>
            
            } 
            {
            transactionStatus.status == 400 && 
            <div className='flex sm:justify-center sm:items-center mt-12'>
                <XCircleIcon className='w-6 h-6 mr-1 text-red'/>
                <p className='text-red font-medium text-sm sm:text-base text-center'>{ transactionStatus.errorMessage }</p>
            </div>
            }
        </div>
    )
};
