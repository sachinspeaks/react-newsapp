import React from "react";

const NewsItem=(props)=> {
    let { title, description, imageurl, newsurl, author, date, source } = props;
    return (
      <div >
        <div className="card border border-dark border border-5 border-opacity-25">
        <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
              <span className="badge bg-danger" >
                {source}
              </span>
            </div>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
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

export default NewsItem;
