import React, { useEffect, useLayoutEffect, useState } from 'react';
import web3 from '../ethereum/web3';
import { ActiveLink } from './ActiveLink';
import { ModalMenu } from './ModalMenu';
import { ModalInstallMetamask } from './ModalInstallMetamask';
import Image from 'next/image';
import discordBlack from '../public/discord-black.svg';
import discordWhite from '../public/discord-white.svg';

export const Navbar = () => {

    const [login, setLogin] = useState({
        connected: false,
        accounts: [],
        currentAccount: '',
        fetchAccount: false
    })

    const [installMetamask, setInstallMetamask] = useState(false);

    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const isConnected = async() => {
            const accounts = await web3.eth.getAccounts();
            setLogin({
                ...login,
                fetchAccount: accounts ? true : false
            })

            if (accounts.length > 0 && ethereum.isConnected()) {
                setLogin({
                    connected: true,
                    accounts,
                    currentAccount: `${accounts[0].slice(0, 4)}...${accounts[0].slice(-5)}`,
                    fetchAccount: accounts ? true : false
                })
            }
        }
        isConnected()
        
    }, []);
    

    const connect = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

                if (accounts.length > 0 && ethereum.isConnected()) {
                    setLogin({
                        ...login,
                        connected: true,
                        accounts,
                        currentAccount: `${accounts[0].slice(0, 4)}...${accounts[0].slice(-5)}`,
                        fetchAccount: accounts ? true : false
                    })
                }
            } else {
                setInstallMetamask(true)
            }
        } catch (err) {
           if (err.code === 4001) {  // If this happens, the user rejected the connection request.
              console.log('Please connect to MetaMask.'); 
            } else {
              console.error(err);
            }
        }
        
    }

    useLayoutEffect(() => {
        if (openMenu) {
          document.body.style.overflow = "hidden";
          document.body.style.height = "100%";
        }
        if (!openMenu) {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }
      }, [openMenu]);

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

    return (
        <nav className='h-16 border-b border-neutral-200 border-solid shadow bg-blackbg'>
            <ul className='flex items-center h-full sm:container sm:mx-auto mx-5  text-whitefont'>
            
                <li className='lg:mr-16 font-extrabold text-2xl'>GamblEarn</li>
                <li className='mr-12 hidden lg:list-item hover:text-orange'>
                    <ActiveLink href={'/'}>Home</ActiveLink>
                </li>
                <li className='mr-12 hidden lg:list-item hover:text-orange'>
                    <ActiveLink href={'/how-to-play'}>How To Play</ActiveLink>
                </li>
                <li className='mr-12 hidden lg:list-item hover:text-orange'>
                    <ActiveLink href={'/gambles'}>Gambles</ActiveLink>
                </li>
                <li className='mr-12 hidden lg:list-item hover:text-orange'>
                    <ActiveLink href={'/create-gamble'}>Create Gamble</ActiveLink>
                </li >
                <li className='mr-8 2xl:mr-16 mt-2 hidden lg:list-item hover:text-orange ml-auto'>
                    <a href='https://discord.gg/rtnFwG96rX' target='_blank' rel='noreferrer'><Image src={ discordWhite } alt="discord-icon" width={25}/></a>
                </li >
                <li className='ml-auto lg:hidden cursor-pointer' onClick={ () => { setOpenMenu(true) }}>
                    <span className='block w-7 h-1 bg-whitefont mb-1'></span>
                    <span className='block w-7 h-1 bg-whitefont mb-1' ></span>
                    <span className='block w-7 h-1 bg-whitefont'></span>
                </li>    
                { login.connected && login.fetchAccount && <li className='hidden lg:list-item'>{ login.currentAccount }</li> }
                { !login.connected && login.fetchAccount && <button className='px-5 py-1.5 rounded font-medium hidden lg:list-item bg-orange text-white hover:brightness-110 active:brightness-95' onClick={ connect }>Login</button> }
                { openMenu && 
                    <ModalMenu
                        setOpenMenu={ setOpenMenu  }   
                    >
                        <ul className='text-2xl font-medium flex flex-col items-center h-full'>
                            <li className='mt-16 md:mt-8 mb-14  hover:text-orange'>
                                <ActiveLink href={'/'} lg >Home</ActiveLink>
                            </li>
                            <li className='mb-14 hover:text-orange'>
                                <ActiveLink href={'/how-to-play'} lg> How To Play</ActiveLink>
                            </li>
                            <li className='mb-14 hover:text-orange'>
                                <ActiveLink href={'/gambles'} lg >Gambles</ActiveLink>
                            </li>
                            <li className='mb-14 hover:text-orange'>
                                <ActiveLink href={'/create-gamble'} lg >Create Gamble</ActiveLink>
                            </li >
                            <li className='hover:text-orange'>
                                <a href='https://discord.gg/rtnFwG96rX' target='_blank' rel='noreferrer'><Image src={ discordBlack } alt="discord-icon" width={40}/></a>
                            </li >
                            { login.connected && login.fetchAccount && <li className='mt-auto'>{ login.currentAccount }</li> }
                            { !login.connected && login.fetchAccount && <button className='mt-auto px-5 py-1.5 rounded font-medium bg-orange text-white hover:brightness-110 active:brightness-95' onClick={ connect }>Login</button> }
                        </ul>
                    </ModalMenu> 
                }
            </ul>

            { 
                installMetamask && 
                <ModalInstallMetamask 
                    setInstallMetamask={ setInstallMetamask } 
                />
            }
        </nav>
    )
    
}
