import React, { Component, useState, useEffect } from "react";

const App = () => {
    //state
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("react");
    const [url, setUrl] = useState(
        "http://hn.algolia.com/api/v1/search?query=react"
    );
    const [loading, setLoading] = useState(false);
    //fetch news
    const fetchNews = () => {
        setLoading(true);
        fetch(url)
            .then(result => result.json())
            .then(data => (setNews(data.hits), setLoading(false)))
            .catch(error => console.log(error));

    };

    useEffect(() => {
        fetchNews();
    }, [url]);

    const handleChange = e => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        setUrl(`http://hn.algolia.com/api/v1/search?query=react =${searchQuery}`)
    }

    const showLoading = () => (loading?<h3>loading...</h3> : "")

    const searchForm = () => (
        <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
        </form>
    )
    const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

    return (
        <div>
            <h2>News</h2>
            {showLoading()}
            {searchForm()}
            {showNews()}
            
        </div>
        
    )
};


//const app = () => {
//    const [count, setcount] = usestate(0);

//    useeffect(() => {
//        document.title = `clicked ${count} times`;
//    });

//    const increment = () => {
//        setcount(count + 1);
//    };

//    return (
//        <div>
//            <h2>counter app</h2>
//            <button onclick={increment}>
//                clicked {count} times
//            </button>
//        </div>

//    );

//};


//class app extends component {
//    state = {
//        count: 0
//    };

//    increment = () => {
//        this.setstate({
//            count: this.state.count + 1
//        });
//    };
//    componentdidmount() {
//        document.title = 'clicked ${this.state.count} times';
//    };
//    componentdidupdate() {
//        document.title = 'clicked ${this.state.count} times';
//    };

//    render() {
//        return (
//            <div>
//                <h2>counter app</h2>
//                <button onclick={this.increment}>
//                    clicked {this.state.count} times
//                </button>
//            </div>
//          );
//    }
//}

export default App;
