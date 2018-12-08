// show personal book shelf
// wireframes page 7
// it is the ancestor component of  bookcard and button

import React, { Component } from 'react';
import BookCard from './BookCard';
import api from '../../api';



class BookShelf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      buttonCont: "Delete",
    }
  }

  buttonClick(){
    console.log("buttonClick");
    this.props.moreInfo();
  }

  deleteBook(book){
    console.log("delete")
    console.log(book._id);
    let bookId = book._id;
    api.removeBook(bookId).then(res => {
      let userId = api.getUserId();
      api.getBooks(userId).then(res => {
        this.setState({
          books: res
        })
      })
    })
  }
  updateBooks(){
    let userId = api.getUserId();
    api.getBooks(userId).then(res => {
      this.setState({
        books: res
      })
      console.log(this.state.books)
    })
  }
  render() {                
    return (
      <div className ="container">
      <div className="bookshelf row" style={{marginTop: "20px"}}>
        {this.state.books && this.state.books.map((book, i) => (
          <div className="col-md-6 col-sm-12 col-lg-3 character" key={i}>
            <BookCard  
            book={book}
            isInBookShelf = {true} onUpdateBooks ={() => this.updateBooks()}
            />  
           </div>
        ))}
      </div>
      </div>
    );
  }

  componentDidMount(){
    let userId = api.getUserId();
    console.log(userId);
    api.getBooks(userId).then(books => {
      this.setState({
        books: books
      })
      console.log(this.state.books)
    })
  }

}

export default BookShelf;