import React, { useEffect, useState } from 'react'
import initWeb3 from '../ethereum/web33'

const pruebas = () => {

    const [web3, setWeb3] = useState();



    useEffect(() => {
        
        const init = async () => {
            if (web3 === null) {
                
                const web3Instance = await initWeb3();
                setWeb3(web3Instance);
               

            }
        }

        init()
    
      
    }, [])
    
    useEffect
    

    return (
        <div>pruebas</div>
    )
}

export default pruebas