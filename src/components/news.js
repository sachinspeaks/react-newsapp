import React, { Component } from 'react'
import NewsItem from './newsitem'
import Spinner from './spinner';

export class News extends Component {
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super();
    console.log("hello i am a constructor from news component ")
    this.state = {
      articles: [],
      loading: false, 
      page: 1
    }
    document.title=`News Monkey ${this.capitalizeFirstLetter(props.category)}`
  }

  async updatenews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f91b353263364d029b0a515ad7b588dd&page=${this.state.page}&pageSize=${this.props.pagesize}`
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({ articles: parsedData.articles, totalresults: parsedData.totalResults, loading:false })
  }

  async componentDidMount() {
    this.updatenews();
  }
  handlenextclick = async () => {
    console.log("next")
    this.setState({page:this.state.page+1},()=>{this.updatenews()})
  }
  handleprevclick = async () => {
    console.log("prev")
    this.setState({page:this.state.page-1},()=>{this.updatenews()})
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-5'>News Monkey {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage ? element.urlToImage : "https://image.cnbcfm.com/api/v1/image/107214141-16795879462023-03-23t160659z_1087005215_rc2qzz9pnl9q_rtrmadp_0_france-pensions-protests.jpeg?v=1679655479&w=1920&h=1080"} newsurl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-5">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handleprevclick}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalresults/this.props.pagesize)} type="button" className="btn btn-success" onClick={this.handlenextclick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News