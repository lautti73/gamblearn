import { useState } from 'react';
import factory from '../ethereum/factory';
import Gamble from '../ethereum/gambleGame'
// import { GambleContainer } from '../components/GambleContainer';
import { FilterGamble } from '../components/FilterGamble';
import { Layout } from '../components/Layout';
import { GamblesPagination } from '../components/GamblesPagination';
import Head from 'next/head';



const Home = ({ gambles }) => {

    const getGambleByOfficial = (off) => {
        return gambles.filter( (e) => e.official == off )
    }

    const [gamblesFiltered, setGamblesFiltered] = useState(getGambleByOfficial(true));
    console.log( gamblesFiltered  )
    return (
        <>
        <Head>
            <title>Gambles</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>

            <main className='sm:container sm:mx-auto mx-5 mt-8 mb-24 flex flex-col lg:flex-row'>
                
                <div className='flex flex-col order-last flex-1'>
                    <GamblesPagination 
                        gamblesFiltered={ gamblesFiltered }

                    />
                </div>
            
            <FilterGamble
                setGamblesFiltered={ setGamblesFiltered }
                getGambleByOfficial={ getGambleByOfficial }
            />
            </main>

        </Layout>
        </>
    )
    
};

export async function getServerSideProps() {

    const deployedGambles = await factory.methods.getDeployedGambleGames().call();

    const gambles = await Promise.all(deployedGambles.map( async( gmbAddress ) => {
        const gambleAddress = gmbAddress;
        const gamble = Gamble( gmbAddress )
        const firstTeam = await gamble.methods.firstTeam().call();
        const secondTeam = await gamble.methods.secondTeam().call();
        const players = await gamble.methods.getGambles().call();
        const balance = await gamble.methods.getContractBalance().call();
        const completed = await gamble.methods.completed().call();
        const official = await gamble.methods.official().call();
        const type = await gamble.methods.gambleType().call();
        const subtype = await gamble.methods.gambleSubType().call();
        const object = {
            gambleAddress,
            firstTeam,
            secondTeam,
            players,
            balance,
            completed,
            official,
            type,
            subtype
        }
        return (object)
    }))

    

    return {
      props: { 
          gambles
    } // will be passed to the page component as props
    }
  }



export default Home;
