import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'

const Policy = () => {
    return (
        <Layout title={"Policy"}>
            <div style={{ marginLeft: '50px', marginTop: '50px' }} className='row contactus '>
                <div className='col-md-6'>
                    <img
                        src="/images/policy.webp"
                        alt="contactus"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginTop: '100px', marginLeft: '80px' }} className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>POLICY </h1>
                    <p className='text-justify mt-2'>
                        It is a long established fact that a reader will be distracted by the readable content of
                        a page when looking at its layout
                    </p>
                    <p className='mt-3'>
                        <BiMailSend /> : www.minhquy@ecommerce.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall /> : 0898240032
                    </p>
                    <p className='mt-3'>
                        <BiSupport /> : 1800-000-000 (free)
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy
