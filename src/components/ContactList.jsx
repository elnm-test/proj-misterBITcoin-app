import React from 'react';
import ContactListPreview from '../components/ContactListPreview';
import { Link } from 'react-router-dom'

export default function ContactList(props) {
    const mapContacts = props.contacts.map((contact) => {
        const route = `/contact/${contact._id}`
        return (
            <Link to={route} key={contact._id}>
                <ContactListPreview contact={contact} />
            </Link>
        )
    })
    return (
        <ul className="clean-list flex column center">
            {mapContacts}
        </ul>
    )
}