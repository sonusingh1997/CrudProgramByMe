import React from 'react'
export const UserList = (props) => {

    return (
        <div className="card-container">
            <h1>CARD  {props.id + 1}</h1>
            <hr />
            <div>
                <h1 className="back1">BN : {props.users.bookName}</h1>
                <h1 className="back2">AN : {props.users.authorName}</h1>
            </div>
            <div className="card_button">
                <button type="button" onClick={() => { props.OnEdit(props.id) }}>Edit</button>
                <button type="button" onClick={() => { props.OnDelete(props.id) }}>Remove</button>
            </div>

        </div>

    )

}

