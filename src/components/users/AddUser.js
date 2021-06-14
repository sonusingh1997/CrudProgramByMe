import React, { useState, useEffect } from 'react'
import { UserList } from './UserList'
import '../../content/style.css'

const getLocalItems = () => {
    const list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else
        return [];
}


export const AddUser = () => {
    const [bookName, setbookName] = useState('');
    const [authorName, setauthorName] = useState('');
    const [inputTake, AllInputtake] = useState(getLocalItems());
    const [changeButton, setChangeButton] = useState(true);
    const [isEditItem, setIsEditItems] = useState(null);

    const SubmitHandler = (e) => {
        e.preventDefault();
        if (!bookName && authorName) {
            alert("plz fill Data you want");
        } else if (bookName && authorName && !changeButton) {
            AllInputtake(inputTake.map((curEle, i) => {
                if (i === isEditItem) {
                    return { ...curEle, bookName: bookName, authorName: authorName };
                }
                return curEle;
            })

            )
            setChangeButton(true);
            setbookName('');
            setauthorName('')
            setIsEditItems(null);

        }



        else {
            const newInput = { bookName: bookName, authorName: authorName }
            AllInputtake([...inputTake, newInput]);
            setbookName('');
            setauthorName('')
        }

    }

    const DeleteUser = (id) => {
        // AllInputtake((inputTake) => {
        //     return inputTake.filter((curEle, i) => {
        //         return id !== i;
        //     })

        // })
        const updatedItems = inputTake.filter((curEle, i) => {
            return id !== i;
        });

        AllInputtake(updatedItems);
    }

    const EditUser = (id) => {
        const newEditItem = inputTake.find((curEle, i) => {
            return id === i;
        })
        console.log(newEditItem);
        setChangeButton(false);
        setbookName(newEditItem.bookName);
        setauthorName(newEditItem.authorName)
        setIsEditItems(id);
    }


    //add set items in local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(inputTake));

    }, [inputTake])

    return (
        <>
            <div className="container">
                <h1>Welcome to Book Crud Operation</h1>
                <form onSubmit={SubmitHandler} className="inputHandle">
                    <div className="input1">
                        <label htmlFor="bookName">BookName</label>
                        <input type="text" name="bookName" value={bookName} placeholder="enter BookName..."
                            onChange={(e) => setbookName(e.target.value)} autoComplete="off"
                        ></input>
                    </div>
                    <div className="input2">
                        <label htmlFor="authorName">AuthorName</label>
                        <input type="authorName" name="authorName" value={authorName} placeholder="enter authorName..."
                            onChange={(e) => setauthorName(e.target.value)} autoComplete="off"
                        ></input>
                    </div>
                    <div className="button">
                        {
                            changeButton ? <button type="submit" >addBook</button> :
                                <button type="submit" >EditBook</button>
                        }

                    </div>
                </form>
            </div>

            <div>
                {
                    inputTake.map((curEle, i) => {
                        return (
                            <UserList users={curEle} key={i} id={i} OnDelete={DeleteUser} OnEdit={EditUser} />
                        )
                    })
                }

            </div>

        </>
    )
}
