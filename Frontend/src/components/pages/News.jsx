import React, { useEffect, useState } from 'react'
import Error from '../../assets/Error.png'
import PulseLoader from "react-spinners/PulseLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const News = () => {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#010822");

    const [data, setData] = useState([])

    const fetchNews = async () => {
        try {
            setLoading(true);
            const today = new Date();
            const lastWeek = new Date();
            lastWeek.setDate(today.getDate() - 7);
    
            const API_KEY = import.meta.env.VITE_API_KEY;
    
            // Use the proxy path `/api`
            const url = `/api/v2/everything?q=hospitals&from=${lastWeek.toISOString()}&to=${today.toISOString()}&sortBy=publishedAt&apiKey=${API_KEY}`;
            console.log("Fetching news from URL:", url);
    
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Fetched Data:", data);
            setData(data.articles);
        } catch (error) {
            console.error("Failed to fetch news:", error);
            alert("Failed to fetch news");
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <div className='bg-[#d0d0d0] min-h-screen'>
            <div className='pt-10 pb-6 flex flex-col md:ml-72'>
                <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mb-5'>Latest News</h1>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            <PulseLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={15}
                            />
                            {
                                data && data.length > 0 ? (
                                    data.map((news) => (
                                        <div className="p-4 md:w-1/3" key={news.id}>
                                            <div className='flex'>
                                                <div className="bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={news.urlToImage == null ? Error : news.urlToImage} alt="blog" />
                                                    <div className="p-6 bg-white">
                                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{news.source.name}</h2>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{news.title}</h1>
                                                        <p className="leading-relaxed mb-3">{news.description}</p>
                                                        <div className="flex items-center flex-wrap">
                                                            <a className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0" href={news.url} target='_blank' rel='noopener noreferrer'>
                                                                Learn More
                                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M5 12h14"></path>
                                                                    <path d="M12 5l7 7-7 7"></path>
                                                                </svg>
                                                            </a>
                                                            <div className='ml-28'>
                                                                <p>{news.publishedAt.slice(0, 10)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='ml-4 mt-3 font-medium'>No news :/</div>
                                )
                            }

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default News