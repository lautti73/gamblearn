import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/Layout';

const howtoplay = () => {
    return (
        <>
        <Head>
            <title>How to play</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
             
            <main className='mt-8 mb-24 mx-auto text-lg'>
                <div className='sm:container sm:mx-auto mx-5'>
                    <h1 className='mb-3 text-4xl font-bold text-blackfont'>How to play</h1>
                    <p className='mb-12'>You need to have <a href='https://metamask.io/' target='_blank' rel='noreferrer' className='text-sky-400'>metamask</a> installed.</p>
                    <p className='font-medium'>Start betting in 3 simple steps:</p>
                    <ol className='mb-12'>
                        <li className='list-decimal ml-8'>Select a <Link href='/gambles'><a className='text-green'>gamble</a></Link>.</li>
                        <li className='list-decimal ml-8'>Select the <span className='font-medium'>team</span> you want to bet for and the <span className='font-medium'>amount</span> of BNB.</li>
                        <li className='list-decimal ml-8'>Click on <span className='font-medium'>Enter gamble</span> button.</li>
                    </ol>
                    <p className='mb-6'>Once the game finished, the owner will load the result. Then the total amount of the BNB bet on the gamble will be divided (depending on the amount you bet) among the people who gambled for the winner team.</p>
                    <p>If you win, we will take only the 1% of your reward to make GamblEarn sustainable. </p>
                </div>
            </main>;


        </Layout>
        </>
  )
};

export default howtoplay;
