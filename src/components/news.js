import React, { Component } from "react";
import NewsItem from "./newsitem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super();
    console.log("hello i am a constructor from news component ");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalresults: 0,
      first:true
    };
    document.title = `News Monkey ${this.capitalizeFirstLetter(
      props.category
    )}`;
  }

  async updatenews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalresults: parsedData.totalResults,
      loading: false,
    })
  }

  async componentDidMount() {
    // this.updatenews();
    this.fetchMoreData()
  }

  fetchMoreData = async () => {
    this.state.first && this.props.setProgress(10);
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    this.state.first && this.props.setProgress(30);
    let parsedData = await data.json();
    this.state.first && this.props.setProgress(50);
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalresults: parsedData.totalResults,
      loading: false
    })
    this.state.first && this.props.setProgress(100);
    this.setState({first:false})
  };

  render() {
    return (
      <>
        <h1 className="text-center my-5">
          News Monkey {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalresults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
}

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