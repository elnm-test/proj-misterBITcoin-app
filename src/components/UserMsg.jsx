import React from 'react';

export default function UserMsg(props){
    var template;
    console.log(props.status ,typeof props.status)
    switch(props.status){
        case(true) : template = (<span className="transfer-msg transfer-success">Transfer Successed</span>)
                    break;
        case(false) : template = (<span className="transfer-msg transfer-rejected">Transfer Rejected, Invalid Ammount</span>)
                    break;

        default: template = (<span className="transfer-msg"></span>)
    }
    return (
        <div className="msg-wrapper">
            {template}
        </div>
    )
}