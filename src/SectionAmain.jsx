import React, {Component} from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./SectionAnavbar"
class MainComponent extends Component{
    state={
        products:[
        {"code":"PEP221","prod":"Pepsi","price":12,"instock":"Yes","category":"Beverages"},
        {"code":"COK113","prod":"Coca Cola","price":18,"instock":"Yes","category":"Beverages"},
        {"code":"MIR646","prod":"Mirinda","price":15,"instock":"No","category":"Beverages"},
        {"code":"SLI874","prod":"Slice","price":22,"instock":"Yes","category":"Beverages"},
        {"code":"MIN654","prod":"Minute Maid","price":25,"instock":"Yes","category":"Beverages"},
        {"code":"APP652","prod":"Appy","price":10,"instock":"No","category":"Beverages"},
        {"code":"FRO085","prod":"Frooti","price":30,"instock":"Yes","category":"Beverages"},
        {"code":"REA546","prod":"Real","price":24,"instock":"No","category":"Beverages"},
        {"code":"DM5461","prod":"Dairy Milk","price":40,"instock":"Yes","category":"Chocolates"},
        {"code":"KK6546","prod":"Kitkat","price":15,"instock":"Yes","category":"Chocolates"},
        {"code":"PER5436","prod":"Perk","price":8,"instock":"No","category":"Chocolates"},
        {"code":"FST241","prod":"5 Star","price":25,"instock":"Yes","category":"Chocolates"},
        {"code":"NUT553","prod":"Nutties","price":18,"instock":"Yes","category":"Chocolates"},
        {"code":"GEM006","prod":"Gems","price":8,"instock":"No","category":"Chocolates"},
        {"code":"GD2991","prod":"Good Day","price":25,"instock":"Yes","category":"Biscuits"},
        {"code":"PAG542","prod":"Parle G","price":5,"instock":"Yes","category":"Biscuits"},
        {"code":"MON119","prod":"Monaco","price":7,"instock":"No","category":"Biscuits"},
        {"code":"BOU291","prod":"Bourbon","price":22,"instock":"Yes","category":"Biscuits"},
        {"code":"MAR951","prod":"MarieGold","price":15,"instock":"Yes","category":"Biscuits"},
        {"code":"ORE188","prod":"Oreo","price":30,"instock":"No","category":"Biscuits"}
        ],
        Bill:[],
        view: 1,
        active: "",
        category:"",
        instock:"",
        price:"",
        m1:"",
        m2:-1
    };
    sort = (num) => {
        let s1 = {...this.state};
        s1.m2=num;
        if(num===0) s1.products.sort((p1,p2) => p1.code.localeCompare(p2.code))
        s1.m1="X"
        
        if(num===1) s1.products.sort((p1,p2) => p1.prod.localeCompare(p2.prod))
        s1.m1="X"
        if(num===2) s1.products.sort((p1,p2) => p1.category-p2.category)
        s1.m1="X"
        if(num===3) s1.products.sort((p1,p2) => p1.price-p2.price)
        s1.m1="X"
        if(num===4) s1.products.sort((p1,p2) => p1.instock.localeCompare(p2.instock))
        s1.m1="X"
        this.setState(s1)
    }   
  
    handleView = (num) => {
        let s1 = {...this.state};
        s1.view = num;
        s1.active="active";
        this.setState(s1);
    }
    handleRemove=(index)=>{
        let s1 = {...this.state};
        if(s1.Bill[index].quantity<=1){
            s1.Bill.splice(index,1);
        }else{
            s1.Bill[index].quantity--
            s1.Bill[index].value=s1.Bill[index].quantity*s1.Bill[index].price
        }
        this.setState(s1)
    }
    handleDelete=(index)=>{
        let s1 = {...this.state};
        s1.Bill.splice(index,1);
        this.setState(s1)
    }
    handleChange = (e) => {
        let {currentTarget:input} = e;
        let s1 = {...this.state};
        s1[input.name] = input.value
        this.setState(s1)
    }
    makeDD = (label,arr,name,value) => {
        return(
            <React.Fragment>
            <select id={name} name={name} value={value} onChange={this.handleChange} className="form-control">
                <option value="">{label}</option>
                {arr.map(ar=>
                <option>{ar}</option>
                )}
            </select>
            </React.Fragment>
        )
    }
    addToBill = (pr) =>{
        console.log(pr)
        let s1 = {...this.state};
        console.log("AAA",s1)
        let index=s1.Bill.findIndex(fi=>fi.code===pr.code)
        console.log("PP",index)
        if(s1.Bill.length===0 || index<0){
            let quantity = 1
            s1.Bill.push({code: pr.code, prod: pr.prod, price: pr.price, quantity: quantity, value: (quantity*pr.price)}) 
        }
        else if(index>=0){
            s1.Bill[index].quantity++;
            s1.Bill[index].value = s1.Bill[index].quantity*s1.Bill[index].price;
        }
        this.setState(s1)
    }
    clear =() => {
        let s1 = {...this.state}
        s1.Bill.splice(0)
        this.setState(s1);
    }

    render() {
        let {price,instock,category,active,products,Bill,view,m1,m2} = this.state;
        let catArr = products.reduce((acc,curr) => acc.find(fi=> fi===curr.category) ? acc : [...acc,curr.category],[])
        let quantity= Bill.reduce((acc,curr) => acc+curr.quantity ,0) 
        let amount= Bill.reduce((acc,curr) => acc+curr.value ,0)
        let priceArr = ["<10","10-20","<20"]
        let inStockArr = ["Yes","No"]
        let products1 = category ? products.filter(pr=> pr.category===category) : products;
        let products2 = instock ? products1.filter(pr=> pr.instock===instock) : products1;
        let products3 = price==="<10" 
                            ? products2.filter(pr=> pr.price<=9) 
                            : price==="10-20" 
                            ? products2.filter(pr=> pr.price>=10 && pr.price<=20) 
                            : price===">20" 
                            ? products2.filter(pr=> pr.price>=21)  
                            : products2;
        return(
            <div className="container">
                <NavBar handleView={this.handleView} active={active} />
                {view===0 ? (
                    <React.Fragment>

                   <h2 style={{ color: 'red' }}>Details of Current Bills</h2>



                    {/* /////bill\\\\\\\\ */}
                    <label className="mx-1" style={{ color: 'red' }}>Items: {Bill.length}</label>
                    <label className="mx-1" style={{ color: 'red' }}>Quantity: {quantity}</label>
                    <label className="mx-1" style={{ color: 'red' }}>Amount: {amount}</label><br/>

                    <div className="row">
                    {Bill.map((bill,index)=>
                        <div className="col-12">
                        <label className="mx-1">{bill.code}</label>
                        <label className="mx-1">{bill.prod}</label>
                        <label className="mx-1">Price: {bill.price}</label>
                        <label className="mx-1">Quantity: {bill.quantity}</label>
                        <label className="mx-1">Value: {bill.value}</label>
                        <React.Fragment>
                        <button className="btn btn-success" onClick={()=> this.addToBill(bill)}>
                        <i className="fas fa-plus"></i>
                        </button>
                        <button  className="btn btn-warning"onClick={() => this.handleRemove(index)}>
                        <i className="fas fa-minus"></i>
                        </button>
                        <button  class="btn btn-danger" onClick={() => this.handleDelete(index)}>
                        <i className="fas fa-times"></i>
                        </button>
                        </React.Fragment>
                        </div>
                        )}
                    </div>
                    {Bill.length>0
                    ?<button className="btn btn-primary" onClick={()=> this.clear()}>Clear Bill</button>
                    :""}

                    {/* //////////DROPDOWN\\\\\\\\\\ */}
                    <div className="row mt-1">
                        <div className="col-3 mt-2"><h6 style={{ color: 'white' }}>Select the Filter:</h6></div>
                        <div className="col-3">{this.makeDD("Select Category",catArr,"category",category)}</div>
                        <div className="col-3">{this.makeDD("Select In Stock",inStockArr,"instock",instock)}</div>
                        <div className="col-3">{this.makeDD("Select Range",priceArr,"price",price)}</div>
                    </div>
                        {/* // //////////Table header\\\\\\\\\\\\\\\\\ */}
                        <div className="row bg-dark text-white text-center mt-2 pb-2">
                        <div className="col-lg-2 col-md-2 col-12">
                           <label className="pt-1" onClick={()=> this.sort(0)}>Code {m2===0 ? m1 : ""}</label>
                                    
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <label className="pt-1" onClick={()=> this.sort(1)}>Product {m2===1 ? m1 : ""}</label>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <label className="pt-1" onClick={()=> this.sort(2)}>Category {m2===2 ? m1 : ""}</label>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <label className="pt-1" onClick={()=> this.sort(3)}>Price {m2===3 ? m1 : ""}</label>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <label className="pt-1" onClick={()=> this.sort(4)}>In Stock {m2===4 ? m1 : ""}</label>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                        </div>
                        </div>
                     
                        {/* <body table> */}
                        <div className="row bg-light text-center borderpb-2">
                        {products3.map(pr=>
                        <React.Fragment>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <label className="pt-1">{pr.code}</label>
                            </div>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <label className="pt-1">{pr.prod}</label>
                            </div>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <label className="pt-1">{pr.category}</label>
                            </div>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <label className="pt-1">{pr.price}</label>
                            </div>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <label className="pt-1">{pr.instock}</label>
                            </div>
                            <div className="col-lg-2 col-md-2 col-12 border">
                                <button className="btn btn-secondary m-1 btn-sm" onClick={()=>this.addToBill(pr)}>Add to Bill</button>
                            </div>
                            </React.Fragment>
                        )}
                        </div>
                    </React.Fragment>
                    
                ) : ("")}
            </div>
            )
            
    }
  
    
}
export default MainComponent;