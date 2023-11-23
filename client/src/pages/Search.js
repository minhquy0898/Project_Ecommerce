import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch()
    console.log(values);
    return (
        <Layout title={"Search"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search</h1>
                    {/* <h6>
                        {values?.results.lenght < 1
                            ? 'No product found'
                            : `Found ${values?.results.lenght}`}
                    </h6> */}
                    <div className='d-flex flex-wrap mt-4'>
                        {values?.results.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} >
                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">$ {p.price}</p>
                                    <button class="btn btn-primary ms-2">More Details</button>
                                    <button class="btn btn-secondary ms-2">Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
