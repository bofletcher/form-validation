import React from 'react';
import './App.css';
import { Component } from 'react';
import Modal from './Components/Modal/Modal';



const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true;

    // validate form errors being empty
  Object.values(formErrors).forEach(val =>{
     val.length > 0  && (valid = false)}
     );

      // validate the form was filled out
     Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

  return valid;
}




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }, 
      isOpen: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)){
      console.log(`
      --SUBMITTING-- 
      First Name: ${this.state.firstName}
      First Name: ${this.state.lastName}
      First Name: ${this.state.email}
      First Name: ${this.state.password}
      `)
      this.toggleModal();
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'firstName': 
      formErrors.firstName = value.length < 2 ? 'Minimum 2 characters required' : "";
      break;
      case 'lastName': 
      formErrors.lastName = value.length < 3 ? 'Minimum 3 characters required' : "";
      break;
      case 'email': 
      formErrors.email = emailRegex.test(value) &&  value.length > 0 ? '' : "Invalid Email Address";
      break;
      case 'password': 
      formErrors.password = value.length < 6 ? 'Minimum 6 characters required' : "";
      break;
      default:
        break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state))
  }

  backDropClickHandler = () => {
    console.log(this.state)
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
  const { formErrors } = this.state;

  return (
    <div className="wrapper">
      <Modal  show={this.state.isOpen}
          onClose={this.toggleModal}>
            User Created
          </Modal>
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit}  noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input 
            type="text" 
            className={formErrors.firstName.length > 0 ? "error" : null} 
            placeholder="First Name" 
            name="firstName" 
            noValidate
            onChange={this.handleChange}
            />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input 
            type="text" 
            className={formErrors.lastName.length > 0 ? "error" : null}  
            placeholder="Last Name" 
            name="lastName" 
            noValidate
            onChange={this.handleChange}
            />
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            className={formErrors.email.length > 0 ? "error" : null} 
            placeholder="Email" 
            name="email" 
            noValidate
            onChange={this.handleChange}
            />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            className={formErrors.password.length > 0 ? "error" : null}  
            placeholder="Password" 
            name="password" 
            noValidate
            onChange={this.handleChange}
            />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
            <small>Already have an Accout?</small>
          </div>
        </form>
      </div>
    </div>
  );
  }
}

export default App;
