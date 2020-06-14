import React, { Component } from 'react';
import ContactService from '../services/ContactService';
import ContactList from '../components/ContactList'
import ContactFilter from '../components/ContactFilter';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class ContactPage extends Component {
    state = {
        contacts: [],
        filterBy: {
            contactName: ''
        }
    }
    changeFilter = (contactName) => {
        //Change Object state !
        this.setState(
            prevState => {
                let filterBy = Object.assign({}, prevState.filterBy);
                filterBy.contactName = contactName;
                return { filterBy };
            }
        )
    }
    async componentDidMount() {
        var contacts = await ContactService.getContacts();
        this.setState({
            contacts
        })
    }

    render() {
        if(!sessionStorage.loggedInUser) this.props.history.push('/');
        
        var contactsToShow;
        var regex = new RegExp(`${this.state.filterBy.contactName}`, 'ig');
        if (!this.state.filterBy.contactName) contactsToShow = this.state.contacts;
        else contactsToShow = this.state.contacts.filter((contact) => {
            return regex.test(contact.name)
        })

        return (
            <section>
                <div className="contactPage flex column center">
                    <h1 className="title">Your Contact List</h1>
                </div>
                <div className="contactPage-content container flex column center">
                    <div className="contact-main-container flex row center space-between">
                        <ContactFilter changeFilter={this.changeFilter} />
                        <Link className="floated-btn flex row center" to={'/contact/edit'}><FontAwesomeIcon className="icon" icon={faPlus}></FontAwesomeIcon></Link>
                    </div>
                    <ContactList contacts={contactsToShow} />
                </div>

            </section>
        )
    }
}