// show home page of login or not login
// wireframes page 1,4
// it is the ancestor component of filter, bookcard, button

import React, { Component } from "react";
import api from "../../api";
import googleapi from "../../googleapi";
import BookCard from "./BookCard";
import axios from 'axios';
import {Button, Container, Progress,InputGroup,InputGroupAddon, Input} from "reactstrap";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      maxNum: 30,
      randomstartIndex: Math.ceil(Math.random()*20),
      categoryStartIndex: 1,
      authorStartIndex: 1,
      searchContent: "",
      searchStartIndex: 1,
      isSearch: false,
      likes: []
    }
  }

  addBook(book){
    api.addBookToShelf(book).then(res => console.log(res))
  }

  addList(){
    if(this.state.searchContent){
      this.searchResult()
    } else {
      if(!api.isLoggedIn()){
        console.log("random-genenrate-books-more")
        this. randomGenBooks()
      } else {
        console.log("recommendated-books-more")
        this.newRecommendBooks()
      }
    }
  }

  changeContent(e){
    let curValue = e.target.value;
    this.setState({
      searchContent: curValue,
    })
  }
  updateBooks(){
  }
  
  searchResult(){
    console.log("search works")
    let searchValue = this.state.searchContent;
    let startIndex1 = this.state.searchStartIndex;
    let maxNum = this.state.maxNum;
    let isSearch = this.state.isSearch;
    if(isSearch){
      var preBookList = this.state.books.slice();
    } else{
      var preBookList = [];
    }
    googleapi.searchBook(startIndex1, maxNum, searchValue)
    .then(response => {
      let curRes = preBookList.concat(response.slice())
      let size = response.length;
      if(size < 30){
        let randomStartIndex = this.state.randomstartIndex;
        let curMaxNum = 30 - size;
        googleapi.randomGenBooks(randomStartIndex, curMaxNum)
        .then(response =>{
          curRes.concat(response)
          this.setState({
            books: curRes,
            searchStartIndex: startIndex1 + size,
            randomStartIndex: randomStartIndex+ curMaxNum,
            isSearch: true,
          })
        })
      }
      else{
        this.setState({
          books:response,
          searchStartIndex: startIndex1 + size,
          isSearch: true,
        })
      }
    })
  }

  handleScroll = (event) => {

    // if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
    //   this.addList()
  // }
  }

  render() {                
    return (
      <Container className="Home">
        <InputGroup style ={{margin: "10px"}}>
        <Input className='character' placeholder="search content" value = {this.state.searchContent} onChange={(e) => this.changeContent(e)}/>
        <InputGroupAddon className='character' addonType="append" onClick ={() => this.searchResult()} style={{cursor: "pointer", borderRadius: "10px" }}>Search</InputGroupAddon>
      </InputGroup>
        {this.state.books.length == 0 && <Progress bar animated color="info" value="102">Loading</Progress> }
        <div className="row">
          {this.state.books &&
            this.state.books.map((book, i) => (
              <div className="col-md-6 col-xs-12 col-sm-12 col-lg-4 character" key={i}>
                <BookCard 
                  book={book} 
                  isInBookShelf={this.state.userBooklist && this.state.userBooklist.map(userbook => userbook.onlineId).includes(book.onlineId)} 
                  onUpdateBooks ={() => this.updateBooks()}
                />
              </div>
            ))}
        </div>
        <Button onClick={()=>this.addList()} style={{margin: "10px auto" }}>More</Button>
      </Container>
      
    );
  }

  randomGenBooks(){
    let preBookList = this.state.books.slice();
    let startIndex1 = this.state.randomstartIndex;
    let maxNum1 = this.state.maxNum;
    console.log("random generate book")
    googleapi.randombooks(startIndex1, maxNum1)
    .then(response => {
      this.setState({
        books:preBookList.concat(response),
        randomstartIndex: startIndex1 + maxNum1,
      })
    })
  }


  newRecommendBooks(){
    let userId = api.getUserId();
    api.getHistory()
    .then(res => {
      console.log("recommend")
      if(!res){
        
        console.log("likes >>>>")
        console.log(this.state.likes)

        if(this.state.likes.length !== 0 && this.state.likes[0] !== "" ){
          console.log("recommend according first login choice")
          var categoryLike = this.state.likes[0].split(",");
          var temp = [];
          var result = [];
          var curCategoryStartIndex = this.state.categoryStartIndex
          var size = categoryLike.length;
          var numofBook = parseInt(25 / size);
          for(let i =0; i< size; i++){
            temp.push(googleapi.recommendedCategory(curCategoryStartIndex, numofBook,  categoryLike[i])
            .then(response => response))
          }
          axios.all(temp).then(response => {
            for(let i = 0; i < response.length; i++){
              if(response[i] !== undefined){
                for(let j = 0 ; j< response[i].length; j++){
                  if(response[i][j] !== undefined){
                    result.push(response[i][j])
                  }  
                }
              }
            }
            return result
          })
          .then(res => {
            let curMaxNum = this.state.maxNum - res.length;
            let startIndex1 = this.state.randomstartIndex;
            let curBookList = res;
            googleapi.randombooks(startIndex1, curMaxNum)
            .then(res => {
              let preBookList = this.state.books.slice();
              let curCategoryStartIndex = this.state.categoryStartIndex + numofBook;
              curBookList = curBookList.concat(res);
              this.setState({
                books: preBookList.concat(curBookList),
                randomstartIndex: startIndex1 + curMaxNum,
                categoryStartIndex: curCategoryStartIndex ,
              })

            })
          })
        }
        else{
          this.randomGenBooks()
        }
        
      }
      else {
         console.log("recommended according to history")
          var categoryList = res.category;
          var authorList = res.author;
          var size1 = categoryList.length;
          var size2 = authorList.length;
          var numOfBook = parseInt(12 / size1);
          var numOfAuthours = parseInt(12 / size2);
          var curCategoryStartIndex =this.state.categoryStartIndex + numOfBook;
          var curAuthorStartIndex = this.state.authorStartIndex + numOfAuthours;
          var temp = [];
          var result = []
          for(let i =0 ; i< size1; i++){
            temp.push(
              googleapi.recommendedCategory(curCategoryStartIndex, numOfBook, categoryList[i])
              .then(response => response))
          }
          for(let i=0; i < size2; i++){
            temp.push(
              googleapi.recommendedAuthor(curAuthorStartIndex, numOfAuthours, authorList[i])
              .then(response => response))
          }

          axios.all(temp).then(response => {
            for(let i = 0; i < response.length; i++){
              if(response[i] !== undefined && response[i] !== null){
                for(let j = 0 ; j< response[i].length; j++){
                  if(response[i][j] !== undefined){
                    result.push(response[i][j])
                  }  
                }
              }
            }
            return result
          })
          .then(res => {
            let curMaxNum = this.state.maxNum - res.length;
            let startIndex1 = this.state.randomstartIndex;
            let curBookList = res;
            googleapi.randombooks(startIndex1, curMaxNum)
            .then(res => {
              let preBookList = this.state.books.slice();
              let curCategoryStartIndex = this.state.categoryStartIndex + numOfBook;
              let curAuthorStartIndex = this.state.authorStartIndex + numOfAuthours;
              curBookList = curBookList.concat(res);
              this.setState({
                books: preBookList.concat(curBookList),
                randomstartIndex: startIndex1 + curMaxNum,
                categoryStartIndex: curCategoryStartIndex ,
                authorStartIndex: curAuthorStartIndex,
              })

            })
          })
        }
    
    })
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);

    api.getProfile()
    .then(user => {
      this.setState({
        userBooklist: user._booklist,
        likes: user.likes,
      })
      // console.log("user booklist: ", this.state.userBooklist)
      // console.log("user likes: ", this.state.likes)
      // console.log("userid: ", user._id)
      // console.log("user name: ", user.username)

    })

    if(!api.isLoggedIn()){
      console.log("random-genenrate-books")
      this. randomGenBooks()
    } else {
      console.log("recommendated-books")
      this.newRecommendBooks()    
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}

export default Home;