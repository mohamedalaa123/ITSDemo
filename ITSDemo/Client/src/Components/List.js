var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from 'react';
import ComplainDataService from '../Services/Customer.service';
import './List.css';
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this.getAll = function (SortBy, SortDir) {
            if (SortBy === void 0) { SortBy = null; }
            if (SortDir === void 0) { SortDir = null; }
            ComplainDataService.GetCustomers(SortBy, SortDir).then(function (res) {
                var CustResponse = res.data.Data;
                console.log(CustResponse);
                _this.setState({ Customers: CustResponse });
            }).catch(function (err) {
                console.error(err);
            });
            //this.tableHeaders();
        };
        _this.clear = function () {
            _this.setState({
                Customer: {
                    Class: '',
                    Comment: '',
                    Name: '',
                    Id: 0,
                    Phone: '',
                    Email: ''
                }
            });
            document.getElementById('save').disabled = false;
            document.getElementById('update').disabled = true;
            document.querySelectorAll('tr').forEach(function (tr, index) {
                tr.style.background = 'white';
            });
            _this.setState({ CustomerId: 0 });
        };
        _this.tableHeaders = function () {
            console.log('mmmmmmmmmmmmmmmmmmm');
            var thead = document.getElementById('thead');
            thead.innerHTML = '';
            var arr = ['ID', 'Name', 'Class', 'Phone', 'Email', 'Comment'];
            var tr = document.createElement('tr');
            for (var index = 0; index < arr.length; index++) {
                var th = document.createElement('th');
                th.abbr = arr[index];
                th.id = "TH" + arr[index];
                th.textContent = arr[index];
                th.addEventListener('click', _this.sortTable);
                tr.append(th);
            }
            thead.append(tr);
        };
        _this.handleChange = function (e) {
            switch (e.target.id) {
                case 'Name': {
                    _this.setState({
                        Customer: {
                            Name: e.target.value,
                            Class: _this.state.Customer.Class,
                            Comment: _this.state.Customer.Comment,
                            Id: _this.state.Customer.Id,
                            Email: _this.state.Customer.Email,
                            Phone: _this.state.Customer.Phone
                        }
                    });
                    break;
                }
                case 'Class': {
                    if (e.target.value.length === 1) {
                        _this.setState({
                            Customer: {
                                Name: _this.state.Customer.Name,
                                Class: e.target.value.toUpperCase(),
                                Comment: _this.state.Customer.Comment,
                                Id: _this.state.Customer.Id,
                                Email: _this.state.Customer.Email,
                                Phone: _this.state.Customer.Phone
                            }
                        });
                    }
                    break;
                }
                case 'phone': {
                    if (e.target.value.length <= 11) {
                        _this.setState({
                            Customer: {
                                Name: _this.state.Customer.Name,
                                Phone: e.target.value,
                                Comment: _this.state.Customer.Comment,
                                Id: _this.state.Customer.Id,
                                Email: _this.state.Customer.Email,
                                Class: _this.state.Customer.Class
                            }
                        });
                    }
                    break;
                }
                case 'Email': {
                    _this.setState({
                        Customer: {
                            Name: _this.state.Customer.Name,
                            Phone: _this.state.Customer.Phone,
                            Comment: _this.state.Customer.Comment,
                            Id: _this.state.Customer.Id,
                            Email: e.target.value,
                            Class: _this.state.Customer.Class
                        }
                    });
                    break;
                }
                case 'Comment': {
                    _this.setState({
                        Customer: {
                            Comment: e.target.value,
                            Name: _this.state.Customer.Name,
                            Phone: _this.state.Customer.Phone,
                            Id: _this.state.Customer.Id,
                            Email: _this.state.Customer.Email,
                            Class: _this.state.Customer.Class
                        }
                    });
                    break;
                }
            }
        };
        _this.update = function (item) {
            item.target.disabled = true;
            var request = {
                data: {
                    Class: _this.state.Customer.Class,
                    Name: _this.state.Customer.Name,
                    Comment: _this.state.Customer.Comment,
                    Id: _this.state.Customer.Id,
                    Email: _this.state.Customer.Email,
                    Phone: _this.state.Customer.Phone
                }
            };
            if (request === null || request === undefined) {
                return;
            }
            ComplainDataService.AddCustomer(request).then(function (res) {
                console.log(res);
                if (res.data.StatusCode === 1) {
                    var EmpResponse = res.data.Data;
                    console.log(EmpResponse);
                    item.target.disabled = false;
                    _this.getAll();
                    _this.clear();
                }
            }).catch(function (err) {
                console.error(err);
            });
        };
        _this.addCustomer = function (item) {
            item.target.disabled = true;
            ;
            var request = {
                data: {
                    Class: _this.state.Customer.Class,
                    Name: _this.state.Customer.Name,
                    Comment: _this.state.Customer.Comment,
                    Id: _this.state.Customer.Id,
                    Email: _this.state.Customer.Email,
                    Phone: _this.state.Customer.Phone
                }
            };
            if (request === null || request === undefined) {
                return;
            }
            ComplainDataService.AddCustomer(request).then(function (res) {
                console.log(res);
                if (res.data.StatusCode === 1) {
                    var EmpResponse = res.data.Data;
                    console.log(EmpResponse);
                    item.target.disabled = false;
                    // let CustArr = this.state.Customers;
                    // CustArr.push(EmpResponse);
                    // this.setState({ Customers: CustArr });
                    _this.getAll();
                }
            }).catch(function (err) {
                console.error(err);
            });
        };
        _this.highlight = function (item) {
            document.getElementById('save').disabled = true;
            document.getElementById('update').disabled = false;
            var parentElement = item.target.parentElement;
            if (parentElement.style.background === 'yellow') {
                parentElement.style.background = 'white';
                _this.clear();
                _this.setState({ CustomerId: 0 });
                return;
            }
            else {
                document.querySelectorAll('tr').forEach(function (tr, index) {
                    tr.style.background = 'white';
                });
                parentElement.style.background = "yellow";
                console.dir(parentElement.children[0].innerHTML);
                var id_1 = parseInt(parentElement.children[0].innerHTML);
                ComplainDataService.GetCustomerId(id_1).then(function (res) {
                    console.log(res.data.Data);
                    if (res.data.StatusCode === 1) {
                        _this.setState({
                            Customer: {
                                Class: res.data.Data.Class,
                                Comment: res.data.Data.Comment,
                                Name: res.data.Data.Name,
                                Id: 0,
                                Phone: res.data.Data.Phone,
                                Email: res.data.Data.Email
                            },
                            CustomerId: id_1
                        });
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        };
        _this.sortTable = function (item) {
            console.dir(item.target);
            _this.tableHeaders();
            var _a = item.target, innerText = _a.innerText, id = _a.id;
            console.log(id);
            console.log(innerText);
            var SortDir = 'ASC';
            var SortDescription = 'A-Z';
            if (innerText.includes('A-Z')) {
                SortDir = 'DESC';
                SortDescription = 'Z-A';
            }
            switch (id) {
                case 'THID': {
                    _this.getAll('ID', SortDir);
                    break;
                }
                case 'THClass': {
                    _this.getAll('Class', SortDir);
                    break;
                }
                case 'THPhone': {
                    _this.getAll('Phone', SortDir);
                    break;
                }
                case 'THEmail': {
                    _this.getAll('Email', SortDir);
                    break;
                }
                case 'THComment': {
                    _this.getAll('Comment', SortDir);
                    break;
                }
            }
            document.getElementById(id).textContent += ' ' + SortDescription;
            // (item.target as HTMLElement).textContent += ' A-Z';
        };
        _this.state = {
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
        };
        _this.deleteEmployee = _this.deleteEmployee.bind(_this);
        //.tableHeaders();
        _this.getAll();
        return _this;
    }
    List.prototype.deleteEmployee = function (item) {
        var _this = this;
        console.log(item.target);
        item.target.disabled = true;
        ;
        if (this.state.CustomerId == 0) {
            alert("choose row pls");
            item.target.disabled = false;
            ;
            return;
        }
        ComplainDataService.DeleteCustomerById(this.state.CustomerId).then(function (result) {
            if (result.data.StatusCode === 1) {
                _this.getAll();
                _this.clear();
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    List.prototype.render = function () {
        var _this = this;
        return (<div>
                <div className='container'>
                    <form onReset={this.clear} id='CustFRM'>
                        <div className='row'>

                            <label htmlFor='Name' className="col-3 col-form-label">Customer Name</label>
                            <div className="col-3">
                                <input type="text" required value={this.state.Customer.Name} onChange={this.handleChange} className="form-control" id="Name"/>
                            </div>


                            <label htmlFor="Class" className="col-3 col-form-label">Class</label>
                            <div className="col-3">
                                <input type="text" required max={1} onChange={this.handleChange} className="form-control" id="Class" value={this.state.Customer.Class}/>
                            </div>

                        </div>

                        <div className='row'>

                            <label htmlFor='phone' className="col-3 col-form-label">phone</label>
                            <div className="col-3">
                                <input type="text" required className="form-control" id="phone" onChange={this.handleChange} value={this.state.Customer.Phone}/>
                            </div>


                            <label htmlFor="Email" className="col-3 col-form-label">Email</label>
                            <div className="col-3">
                                <input type="email" required className="form-control" id="Email" onChange={this.handleChange} value={this.state.Customer.Email}/>
                            </div>

                        </div>

                        <div className='row'>

                            <label htmlFor='Comment' className="col-3 col-form-label">Comment</label>
                            <div className="col-9">
                                <input type="text" required className="form-control" id="Comment" onChange={this.handleChange} value={this.state.Customer.Comment}/>
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
                            {this.state.Customers !== undefined && this.state.Customers.length > 0 &&
            this.state.Customers.map(function (item, index) {
                return (<tr onClick={_this.highlight} key={index}>
                                            <td>{item.Id}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Class}</td>
                                            <td>{item.Phone}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Comment}</td>
                                        </tr>);
            })}
                            {this.state.Customers !== undefined && this.state.Customers.length === 0 &&
            <tr>
                                    <td>no data available</td>
                                </tr>}
                        </tbody>
                    </table>

                    <div className='row'>
                        <div className='col-12 float-start'>
                            <button onClick={this.deleteEmployee} className='btn btn-success'>Delete</button>
                        </div>
                    </div>

                </div>


            </div>);
    };
    return List;
}(Component));
export default List;
