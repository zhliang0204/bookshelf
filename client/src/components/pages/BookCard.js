// show brief information of book
// wireframes page 1, 4, 7
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api';


class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isInBookShelf: this.props.isInBookShelf
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateHistory(){
    let userId = api.getUserId()
    let historyInfor = {
      author: this.props.book.author,
      category: this.props.book.category
    }

    api.updateHistory(historyInfor, userId)
    .then(res => console.log("success"))
    this.toggle()
  }

  addBook() {
    this.setState({
      isInBookShelf: true
    })
    api.addBookToShelf(this.props.book).then(res => console.log(res));
  }

  deleteBook(){
    api.removeBook(this.props.book._id).then(res => console.log(res))
    this.props.onUpdateBooks();
  }

  render() {
    return (
      <div className="bookcard" style={{height: "100%"}}>
        <div className="card-deck text-center" style={{height: "100%"}}>
          <div className="card mb-4" >
            <img
              className="card-img-top img-fluid"
              src={this.props.book.imageUrl}
              alt="book-image"
              onClick={() => this.updateHistory()}
            />
            <div className="card-body">
              <p className="card-text character" >{this.props.book.title}</p>

              {api.isLoggedIn() && this.state.isInBookShelf && (
                <Button color="danger" outline onClick={() => this.deleteBook()}>
                  Delete
                </Button>
              )}

              {api.isLoggedIn() && !this.state.isInBookShelf && (
                <Button  style={{backgroundColor: "#5D737E"}}  onClick={() => this.addBook()}>
                  Add 
                </Button>
                // color="primary"
                // outline
              )}
            </div>
          </div>
        </div>

        {this.state.modal && (
          <Modal
            isOpen={this.state.modal}
            toggle={() => this.toggle()}
            className={this.props.className}
          >
            <ModalHeader toggle={() => this.toggle()}>
              {this.props.book.title}
            </ModalHeader>
            <ModalBody>
              <p>
                <strong>Authors</strong>: {this.props.book.author.join(", ")}
              </p>
              {this.props.book.description && (
                <p>
                  <strong>Description</strong>: {this.props.book.description}
                </p>
              )}
              {this.props.book.category && (
              <p>
                <strong>Category</strong>: {this.props.book.category.join(",")}
              </p>
              )}
              
            </ModalBody>
            <ModalFooter>
              {this.props.book.buyLink && (
                <Button
                  color="primary"
                  onClick={() => this.toggle()}
                  tag="a"
                  href={this.props.book.buyLink}
                >
                  Buy Link
                </Button>
              )}{" "}
              <Button color="secondary" outline onClick={() => this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

export default BookCard;
