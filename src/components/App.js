import React from "react";
import Movies from './Movies';
import SearchBar from "./SearchBar";
import axios from 'axios';
import AddMovie from "./AddMovies";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditMovie from "./EditMovie";

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    //#region FetchGetData
    // async componentDidMount(){
    //     const baseUrl="http://localhost:3002/movies";
    //     const response=await fetch(baseUrl);
    //     const movieData=await response.json();
    //     this.setState({movies:movieData})
    //    }
    //#endregion

    //#region AxiosGetData

    async componentDidMount() {
        const response = await axios.get("http://localhost:3002/movies");
        // console.log(response);
        this.setState({ movies: response.data })
    }
    //#endregion


    //#region DeleteMovie

    deleteMovie = async (deletmovie) => {

        axios.delete(`http://localhost:3002/movies/${deletmovie.id}`)

        const newMovieList = this.state.movies.filter(
            m => m.id !== deletmovie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }
    //#endregion


    //#region FetchDelete
    // deleteMovie = async (deletmovie) => {

    //     const baseUrl = `http://localhost:3002/movies/${deletmovie.id}`
    //     await fetch(baseUrl, {
    //         method: "DELETE"
    //     })

    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== deletmovie.id
    //     );

    //     this.setState(state => ({
    //         movies: newMovieList
    //     }))
    // }

    //#endregion

    //#region SimpleDelete
    // deleteMovie = (deletmovie) => {
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== deletmovie.id
    //     );

    //     // this.setState({
    //     //     movies: newMovieList
    //     // })

    //     this.setState(state=>({
    //         movies: newMovieList
    //     }))
    // }

    //#endregion


    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }


    AddMovie= async (movie)=>{
        await axios.post(`http://localhost:3002/movies/`,movie)
        this.setState(state=>({
            movies:state.movies.concat([movie])
        }))
    }

    editdMovie= async (id,updatedMovie)=>{
        await axios.put(`http://localhost:3002/movies/${id}`,updatedMovie)
     
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ) // .short((a,b)=>{
        //     return a.id < b.id ? 1 : a.id > b.id ? -1: 0;
        // });

        return (

            <Router>

                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <SearchBar searchMovieProp={this.searchMovie} />

                                    </div>
                                </div>
                                <Movies movies={filteredMovies}
                                    movieListProp={this.deleteMovie} />
                            </div>
                        </React.Fragment>
                    }>
                    </Route>


                    <Route path="/add" element={
                            <AddMovie
                             onMovie={(movie)=>{this.AddMovie(movie)}}
                              
                            />

                    }>
                    </Route>


                    <Route path="/edit/:id" element={

                            <EditMovie
                             onEditMovie={(id,movie)=>{this.editdMovie(id,movie)}}
                              
                            />

                    }>
                    </Route>

                 
                   

                </Routes>

            </Router>
        )

    }


}
export default App;