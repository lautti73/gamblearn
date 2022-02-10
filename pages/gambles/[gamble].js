import React from 'react';
import Gamble from '../../ethereum/gambleGame';
import { GambleBody } from '../../components/GambleBody';
import { Layout } from '../../components/Layout';
import Head from 'next/head';


const gamble = ({ gambleAddress, firstTeam, secondTeam, description, players, balance, manager, completed, completedByWinner, winner, completedDate, type, subtype }) => {

    let firstTeamCount = 0;

    players.forEach(element => { 
        if (element[1] === firstTeam) {
            firstTeamCount += 1
        }
    });

    return (
        <>
        <Head>
            <title>{`${firstTeam} vs ${secondTeam}`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
           
            <GambleBody 
                gambleAddress={ gambleAddress }
                firstTeam={ firstTeam }
                secondTeam={ secondTeam }
                description={ description }
                players={ players }
                balance={ balance }
                manager={ manager }
                firstTeamCount={ firstTeamCount }
                completed={ completed }
                completedByWinner={ completedByWinner }
                winnerEth={ winner }
                completedDate={ completedDate }
                type={ type }
                subtype={ subtype }
            />

        </Layout>
        </>
    )
};

export async function getServerSideProps(context) {

        const gambleAddress = context.params.gamble;
        const gamble = Gamble(gambleAddress)
        const firstTeam = await gamble.methods.firstTeam().call();
        const secondTeam = await gamble.methods.secondTeam().call();
        const description = await gamble.methods.gambleDesc().call();
        const players = await gamble.methods.getGambles().call();
        const balance = await gamble.methods.getContractBalance().call();
        const manager = await gamble.methods.manager().call();
        const completed = await gamble.methods.completed().call();
        const completedByWinner = await gamble.methods.completedByWinner().call();
        const completedDate = await gamble.methods.completedDate().call();
        const winner = await gamble.methods.winner().call();
        const type = await gamble.methods.gambleType().call();
        const subtype = await gamble.methods.gambleSubType().call();
        
 
    return {
      props: { 
          gambleAddress,
          firstTeam,
          secondTeam,
          description,
          players,
          balance,
          manager,
          completed,
          completedByWinner,
          completedDate,
          winner,
          type,
          subtype
    } // will be passed to the page component as props
    }
  }

export default gamble;
