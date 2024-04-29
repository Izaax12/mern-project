import React from 'react';
import {Footer} from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterCompo() {
  return (
    <Footer container className='border border-t-8 border-blue-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-blue-500 rounded-lg'>
                            Alirob
                        </span>
                        ESCOM
                    </Link>
                </div>
                <div className='grid  grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
                    <Footer.Title title='Acerca de'/>
                </div>
            </div>
            <Footer.Divider/>
            <div className=''>
                <Footer.Copyright
                href='#'
                by="Alirob Escom"
                year={new Date().getFullYear()}
                />
            </div>
        </div>
    </Footer>
  )
}
