import { MouseEvent, ChangeEvent, Component, FC, useEffect, useState } from 'react';
import ComplainDataService from '../Services/Customer.service';

import Customer from '../Models/Customer';
import CustomerRequest from '../Models/CustomerRequest';
import './List.css';

type State = {
    Customers: Array<Customer>,
    Customer: Customer,
    CustomerId: number
}

type Props = {};


export default class List extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            Customers: [],
            Customer: {
                Class: '',
                Comment: '',
                Name: '',
                Id: 0,
                Phone: '',
                Email: ''
            },
            CustomerId: 0
        }

        this.deleteEmployee = this.deleteEmployee.bind(this);
        //.tableHeaders();
        this.getAll();

    }



    getAll = (SortBy: string = null, SortDir: string = null) => {
        ComplainDataService.GetCustomers(SortBy, SortDir).then(res => {

            let CustResponse = res.data.Data as Customer[];
            console.log(CustResponse);

            this.setState({ Customers: CustResponse });

        }).catch((err) => {
            console.error(err);
        });

        //this.tableHeaders();
    }



    clear = () => {

        this.setState({
            Customer: {
                Class: '',
                Comment: '',
                Name: '',
                Id: 0,
                Phone: '',
                Email: ''
            }
        });

        (document.getElementById('save') as HTMLInputElement).disabled = false;

        (document.getElementById('update') as HTMLInputElement).disabled = true;

        document.querySelectorAll('tr').forEach((tr, index) => {
            tr.style.background = 'white';
        });

        this.setState({ CustomerId: 0 });

    }

    tableHeaders = () => {

        console.log('mmmmmmmmmmmmmmmmmmm');


        let thead = document.getElementById('thead');
        thead.innerHTML = '';
        let arr = ['ID', 'Name', 'Class', 'Phone', 'Email', 'Comment'];
        let tr = document.createElement('tr');
        for (let index = 0; index < arr.length; index++) {
            let th = document.createElement('th');
            th.abbr = arr[index];
            th.id = "TH" + arr[index];
            th.textContent = arr[index];
            th.addEventListener('click', this.sortTable);
            tr.append(th);
        }

        thead.append(tr);
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case 'Name': {
                this.setState({
                    Customer: {
                        Name: e.target.value,
                        Class: this.state.Customer.Class,
                        Comment: this.state.Customer.Comment,
                        Id: this.state.Customer.Id,
                        Email: this.state.Customer.Email,
                        Phone: this.state.Customer.Phone
                    }
                })

                break;
            }
            case 'Class': {


                if (e.target.value.length === 1) {

                    this.setState({
                        Customer: {
                            Name: this.state.Customer.Name,
                            Class: e.target.value.toUpperCase(),
                            Comment: this.state.Customer.Comment,
                            Id: this.state.Customer.Id,
                            Email: this.state.Customer.Email,
                            Phone: this.state.Customer.Phone
                        }
                    })

                }



                break;
            }
            case 'phone': {

                if (e.target.value.length <= 11) {
                    this.setState({
                        Customer: {
                            Name: this.state.Customer.Name,
                            Phone: e.target.value,
                            Comment: this.state.Customer.Comment,
                            Id: this.state.Customer.Id,
                            Email: this.state.Customer.Email,
                            Class: this.state.Customer.Class
                        }
                    })
                }



                break;
            }
            case 'Email': {
                this.setState({
                    Customer: {
                        Name: this.state.Customer.Name,
                        Phone: this.state.Customer.Phone,
                        Comment: this.state.Customer.Comment,
                        Id: this.state.Customer.Id,
                        Email: e.target.value,
                        Class: this.state.Customer.Class
                    }
                })

                break;
            }
            case 'Comment': {
                this.setState({
                    Customer: {
                        Comment: e.target.value,
                        Name: this.state.Customer.Name,
                        Phone: this.state.Customer.Phone,
                        Id: this.state.Customer.Id,
                        Email: this.state.Customer.Email,
                        Class: this.state.Customer.Class
                    }
                })

                break;
            }

        }
    }


    update = (item: MouseEvent<HTMLInputElement>) => {

        (item.target as HTMLInputElement).disabled = true;

        const request: CustomerRequest = {
            data: {
                Class: this.state.Customer.Class,
                Name: this.state.Customer.Name,
                Comment: this.state.Customer.Comment,
                Id: this.state.Customer.Id,
                Email: this.state.Customer.Email,
                Phone: this.state.Customer.Phone
            }
        }

        if (request === null || request === undefined) {
            return;
        }

        ComplainDataService.AddCustomer(request).then(res => {

            console.log(res);
            if (res.data.StatusCode === 1) {
                const EmpResponse = res.data.Data as Customer;
                console.log(EmpResponse);

                (item.target as HTMLInputElement).disabled = false;
                this.getAll();
                this.clear();

                (document.getElementById('delete') as HTMLInputElement).disabled = true;

            }


        }).catch((err) => {
            console.error(err);
        });
    }

    addCustomer = (item: MouseEvent<HTMLButtonElement>) => {


        (item.target as HTMLInputElement).disabled = true;;


        const request: CustomerRequest = {
            data: {
                Class: this.state.Customer.Class,
                Name: this.state.Customer.Name,
                Comment: this.state.Customer.Comment,
                Id: this.state.Customer.Id,
                Email: this.state.Customer.Email,
                Phone: this.state.Customer.Phone
            }
        }

        if (request === null || request === undefined) {
            return;
        }

        ComplainDataService.AddCustomer(request).then(res => {

            console.log(res);
            if (res.data.StatusCode === 1) {
                const EmpResponse = res.data.Data as Customer;
                console.log(EmpResponse);

                (item.target as HTMLInputElement).disabled = false;

                // let CustArr = this.state.Customers;
                // CustArr.push(EmpResponse);
                // this.setState({ Customers: CustArr });


                this.getAll();
            }


        }).catch((err) => {
            console.error(err);
        });
    }


    deleteEmployee(item: MouseEvent<HTMLInputElement>) {

        console.log(item.target);

        (item.target as HTMLInputElement).disabled = true;;

        if (this.state.CustomerId == 0) {
            alert("choose row pls");
            (item.target as HTMLInputElement).disabled = false;;
            return;
        }

        ComplainDataService.DeleteCustomerById(this.state.CustomerId).then((result) => {
            if (result.data.StatusCode === 1) {
                this.getAll();
                this.clear();
            }

        }).catch((err) => {
            console.error(err);
        });

    }

    highlight = (item: MouseEvent<HTMLTableRowElement>) => {

        (document.getElementById('save') as HTMLInputElement).disabled = true;
        (document.getElementById('update') as HTMLInputElement).disabled = false;


        const { parentElement } = item.target as HTMLElement;

        if (parentElement.style.background === 'yellow') {

            parentElement.style.background = 'white';
            this.clear();
            (document.getElementById('delete') as HTMLInputElement).disabled = true;

            this.setState({ CustomerId: 0 });
            return;

        } else {
            (document.getElementById('delete') as HTMLInputElement).disabled = false;

            document.querySelectorAll('tr').forEach((tr, index) => {
                tr.style.background = 'white';
            });

            parentElement.style.background = "yellow";
            console.dir(parentElement.children[0].innerHTML);

            const id = parseInt(parentElement.children[0].innerHTML);

            ComplainDataService.GetCustomerId(id).then(res => {

                console.log(res.data.Data);
                if (res.data.StatusCode === 1) {
                    this.setState({
                        Customer: {
                            Class: res.data.Data.Class,
                            Comment: res.data.Data.Comment,
                            Name: res.data.Data.Name,
                            Id: 0,
                            Phone: res.data.Data.Phone,
                            Email: res.data.Data.Email
                        },
                        CustomerId: id
                    });
                }


            }).catch(err => {
                console.error(err);
            });
        }
    }


    sortTable = (item: any) => {

        console.dir(item.target);

        this.tableHeaders();

        let { innerText, id } = item.target as HTMLInputElement;
        console.log(id);

        console.log(innerText);

        let SortDir = 'ASC';
        let SortDescription = 'A-Z';

        if (innerText.includes('A-Z')) {
            SortDir = 'DESC';
            SortDescription = 'Z-A';
        }


        switch (id) {
            case 'THID': {
                this.getAll('ID', SortDir);
                break;
            }
            case 'THClass': {
                this.getAll('Class', SortDir);
                break;
            }
            case 'THPhone': {
                this.getAll('Phone', SortDir);
                break;
            }
            case 'THEmail': {
                this.getAll('Email', SortDir);
                break;
            }
            case 'THComment': {
                this.getAll('Comment', SortDir);
                break;
            }
        }

        document.getElementById(id).textContent += ' ' + SortDescription;

        // (item.target as HTMLElement).textContent += ' A-Z';


    }

    render() {
        return (
            <div>
                <div className='container'>
                    <form onReset={this.clear} id='CustFRM'>
                        <div className='row'>

                            <label htmlFor='Name' className="col-3 col-form-label">Customer Name</label>
                            <div className="col-3">
                                <input type="text" required value={this.state.Customer.Name} onChange={this.handleChange} className="form-control" id="Name" />
                            </div>


                            <label htmlFor="Class" className="col-3 col-form-label">Class</label>
                            <div className="col-3">
                                <input type="text" required max={1} onChange={this.handleChange} className="form-control" id="Class" value={this.state.Customer.Class} />
                            </div>

                        </div>

                        <div className='row'>

                            <label htmlFor='phone' className="col-3 col-form-label">phone</label>
                            <div className="col-3">
                                <input type="text" required className="form-control" id="phone" onChange={this.handleChange} value={this.state.Customer.Phone} />
                            </div>


                            <label htmlFor="Email" className="col-3 col-form-label">Email</label>
                            <div className="col-3">
                                <input type="email" required className="form-control" id="Email" onChange={this.handleChange} value={this.state.Customer.Email} />
                            </div>

                        </div>

                        <div className='row'>

                            <label htmlFor='Comment' className="col-3 col-form-label">Comment</label>
                            <div className="col-9">
                                <input type="text" required className="form-control" id="Comment" onChange={this.handleChange} value={this.state.Customer.Comment} />
                            </div>
                        </div>
                    </form>
                    <div className='row'>
                        <div className='col-12 float-start'>
                            <button onClick={this.clear} className='btn btn-primary'>Clear</button>
                            <button id='save' onClick={this.addCustomer} className='btn btn-primary'>Save</button>
                            <button id='update' onClick={this.update} className='btn btn-primary'>Update</button>
                        </div>
                    </div>

                    <table className='table table-hover'>
                        <thead id='thead'>
                            <tr>
                                <th id='THID' onClick={this.sortTable} abbr="THID">ID</th>
                                <th id='THName' onClick={this.sortTable} abbr="THName">Name</th>
                                <th id='THClass' onClick={this.sortTable} abbr="THClass">Class</th>
                                <th id='THPhone' onClick={this.sortTable} abbr="THPhone">Phone</th>
                                <th id='THEmail' onClick={this.sortTable} abbr="THEmail">Email</th>
                                <th id='THComment' onClick={this.sortTable} abbr="THComment">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Customers !== undefined && this.state.Customers.length > 0 &&

                                this.state.Customers.map((item, index) => {

                                    return (
                                        <tr onClick={this.highlight} key={index}>
                                            <td>{item.Id}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Class}</td>
                                            <td>{item.Phone}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Comment}</td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                this.state.Customers !== undefined && this.state.Customers.length === 0 &&
                                <tr>
                                    <td>no data available</td>
                                </tr>
                            }
                        </tbody>
                    </table>

                    <div className='row'>
                        <div className='col-12 float-start'>
                            <button id='delete' disabled onClick={this.deleteEmployee} className='btn btn-success'>Delete</button>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}