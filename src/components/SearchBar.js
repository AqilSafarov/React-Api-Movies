import React from "react";
import {Link} from "react-router-dom";
class SearchBar extends React.Component {

  handleFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="form-row mb-5" style={{display:'flex'}}>
          <div className="col-10">
            <input
              onChange={this.props.searchMovieProp}
              type="text" className="form-control"
              placeholder="search movie"
            />
          </div>
          <div className="col-2">
            <Link type="button" to={"/add"}
              className="btn btn-md btn-danger" style={{ float: 'right' }}>
              AddMovies
            </Link>
          </div>

        </div>
      </form>
    )
  }
}
export default SearchBar