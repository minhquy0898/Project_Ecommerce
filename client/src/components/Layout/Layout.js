import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='auhthor' content={author} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Header />
            <main style={{ minHeight: '70vh', width: '99%' }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Ecommerce',
    description: 'Project',
    keywords: 'React , MongoDb, Node',
    author: "Quy"
}

export default Layout
