import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Content from "./content";
import classNames from 'classnames/bind';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus, faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Category from './category';
import fire from "../JS files/Fire.js";
import Header from "./Header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

library.add(faMinus, faPlus, faCartPlus, faSearch);

var obj = [];

var drinks = [
  {
    name: 'Beer',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-beer-2.jpg?alt=media&token=1482a6ab-38dc-4be6-bde4-6124a9ac7d61&fbclid=IwAR0_lvqM0DLeVr1nM7UwhdqyuQz8-JLHCJa26Oa_mcKCo5NeDYjgjpD6oEo"
  },
  {
    name: 'Brandy',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-brandy.jpg?alt=media&token=7995d8d7-6606-4c82-85dd-e34eb581c477&fbclid=IwAR1N_4AJXEWs1i38nHJ8PaZG2pvM8oeGvygvN6_wuwpWVWCcyg8-tkC_aHw"
  },
  {
    name: 'Champagne',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-champagne.jpg?alt=media&token=4925f67a-0116-4a89-989d-de5a0de08d12&fbclid=IwAR0Dbs9KDZ1v5qI3zF9Jp0NejRgB9-ILTKrVEkC-nkRD0O3exKR8lV9gOJU"
  },
  {
    name: 'Cocktail',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-cocktail.jpg?alt=media&token=14f33175-cdd2-44f1-8ac8-2b1e1dab84bf&fbclid=IwAR1RsqULUbF2LYzD2uswM2RAb8GPJ49iDNNRQCWeqFyuAWfF1L94gsfUmQg"
  },
  {
    name: 'Liqueur',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-liqueur.jpeg?alt=media&token=fe207f5d-dddf-451a-91af-2950f1abebc5&fbclid=IwAR1N_4AJXEWs1i38nHJ8PaZG2pvM8oeGvygvN6_wuwpWVWCcyg8-tkC_aHw"
  },
  {
    name: 'Vodka',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-vodka.jpg?alt=media&token=14ebcc8d-f784-4c81-afbd-c45e40e9f8cd&fbclid=IwAR1zZINMJxLA4S25IYKHt-b0QnGvb1Q02b9yZLtorFXNzAUJeTUgV-3ljpc"
  },
  {
    name: 'Wine',
    photo: "https://firebasestorage.googleapis.com/v0/b/online-shop-22a8a.appspot.com/o/menu-wine.jpg?alt=media&token=a3d221fa-1235-4d9e-8b66-4d572721187f&fbclid=IwAR2dwoJg9SpSm2040YTbvwNtd-x1VLlW2YmpokLDFO1eDJQTt-M6WGZGGD8"
  }
]

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchlist: [],
      categories: '',
      user: null
    }
  }

  onCatClick = (name) => {
    this.setState({
      categories: name
    });
  }

  getData = () => {
    const db = fire.firestore();
    db.collection("beverages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
            obj.push(doc.data());
        })
    })
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  componentDidMount() {
    this.authListener();
    this.getData(); 
  }

  render() {
    // const { obj } = this.props;
    let classForApp = classNames('Home', 'row');
    const { categories, searchlist, user } = this.state;
    // this.getData();
    return (
      <div className={classForApp}>
         {user ? (
            <Link to="/my-account">My Account</Link>
          ) : (
            <div>
              <Link to="/sign-in">SignIn</Link>
              <Link to="/sign-up">SignUp</Link>
            </div>
          )}
        <Header />
        {!categories && drinks.map((item, index) => {
          return (
            <Category key={index} {...item} onCatClick={this.onCatClick}/>
          );
        })}
        {searchlist.length === 0 && categories && obj.filter((item) => item.category.toLowerCase() === categories.toLowerCase()).map((item, index) => {
          return (
            <Content key={index} {...item}/>
          );
        })}
      </div>
    );
  }
}

export default Home;