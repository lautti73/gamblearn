import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/Layout';


const index = () => {
    return (
        <>
        <Head>
            <title>Home</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
            <main className='mt-8 mb-24'>
                <div className='sm:container sm:mx-auto mx-5'>
                    <h1 className='mb-3 text-4xl font-bold text-blackfont'>Welcome to GamblEarn!</h1>
                    <p className='mb-12 text-lg'>Your descentralized site to bet and earn money gambling.</p>
                    <p className='text-xl font-medium mb-1.5'>Why play on GamblEarn?</p>
                    <p className='text-lg'>GamblEarn is a betting website built with <span className='font-medium'>blockchain technology</span> which is the most secure way to manage value on the world.</p>
                    <p className='text-lg'>Create <span className='font-medium'>your own bets</span> and <span className='font-medium'>share</span> them with your friends.</p>
                    <button className='block mt-6 h-9 text-white font-medium bg-green hover:brightness-110 active:brightness-95 px-5 py-1 rounded'>
                        <Link href={'/gambles'}><a>Get started</a></Link>
                    </button>
                </div>
            </main>
        </Layout>
        </>
    )
};

export default index;
