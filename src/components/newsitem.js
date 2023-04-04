import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date ,source} = this.props;
    return (
      <div>
        <div className="card border border-dark border border-5 border-opacity-25">
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:1,marginLeft:-35}}>
              {source}
            </span>
            <p className="card-text">{description}</p>
            <p className="card-text my-2">
              <small className="text-body-secondary">
                By {author} at {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-success"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
