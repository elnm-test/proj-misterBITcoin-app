import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';


export default function ContactListPreview(props) {
    var { contact } = props;
    return (
        <li className="flex row center space-between">
            <div>
                {contact.name}
            </div>
            <div>
                <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon>
            </div>
        </li>
    )
}