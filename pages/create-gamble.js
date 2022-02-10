import Head from 'next/head';
import React from 'react';
import { CreateGambleForm } from '../components/CreateGambleForm';
import { Layout } from '../components/Layout';

const CreateGamble = () => {
    return (
        <>
        <Head>
            <title>Create gamble</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
        
        <main className='mt-8 mb-24 container sm:container mx-auto'>
            <CreateGambleForm 
                
            />
        </main>
        </Layout>
        </>
    )
};

export default CreateGamble;
