import React, {Component} from "react";
class NavBar extends Component{
    render(){
        let { handleView,active } = this.props;
        let s1={
            textDecoration: "none",
            color: "white"
        }
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">
                Online Billing System
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
                <img src="https://media.istockphoto.com/id/1406885804/photo/a-shopping-cart-by-a-store-shelf-in-a-supermarket.webp?b=1&s=170667a&w=0&k=20&c=Zg56zyOfP3C-y4lvrDB0M3y-3SgNwBxVKxvbz3lstEM=" alt="grocery"></img>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class={"nav-item "+active}>
                    <a class="nav-a" style={s1} onClick={() => handleView(0)}>
                    New Bill
                    </a>
                </li>
                </ul>
            </div>
            </nav>
            )
        }
    }
    export default NavBar;