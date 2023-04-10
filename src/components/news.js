import React, { useEffect, useState } from "react";
import NewsItem from "./newsitem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalresults, settotalresults] = useState(0)
  const [first, setfirst] = useState(true)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const fetchMoreData = async () => {
    first && props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
    console.log(totalresults)
    setpage(page + 1)
    let data = await fetch(url);
    first && props.setProgress(30);
    let parsedData = await data.json();
    first && props.setProgress(50);
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    settotalresults(parsedData.totalResults)
    setloading(false)
    first && props.setProgress(100);
    setfirst(false)
  };

  useEffect(() => {
    fetchMoreData();
    document.title = `News Monkey ${capitalizeFirstLetter(
      props.category
    )}`
  }, [])

  return (
    <>
      <h1 className="text-center" style={{marginTop:'85px',marginBottom:'25px'}}>
        News Monkey {capitalizeFirstLetter(props.category)}{" "}
        Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalresults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://image.cnbcfm.com/api/v1/image/107214141-16795879462023-03-23t160659z_1087005215_rc2qzz9pnl9q_rtrmadp_0_france-pensions-protests.jpeg?v=1679655479&w=1920&h=1080"
                    }
                    newsurl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string,
// }

export default News;









































// handlenextclick = async () => {
//   console.log("next");
//   this.setState({ page: this.state.page + 1 }, () => {
//     this.updatenews();
//   });
// };
// handleprevclick = async () => {
//   console.log("prev");
//   this.setState({ page: this.state.page - 1 }, () => {
//     this.updatenews();
//   });
// };

// const updatenews=async ()=> {
//   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page}&pageSize=${props.pagesize}`;
//   this.setState({
//     loading: true,
//   });
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   console.log(parsedData);
//   this.setState({
//     articles: parsedData.articles,
//     totalresults: parsedData.totalResults,
//     loading: false,
//   })
// }