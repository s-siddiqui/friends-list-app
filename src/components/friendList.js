import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Pagination from './pagination';

const FriendList = () => {

    let indexOfLastFriend, indexOfFirstFriend, currentItem;
    const [state, setState] = useState({
        inputData: '',
        items: [],
        currentPage: 1    
    });
    const [currentItems, setCurrentItems] = useState([]);
    const itemsPerPage = 4;

    useEffect(() => {
        currentItem = getUpdatedItems(state.items);
        setCurrentItems(currentItem);
    }, [state, state.items, state.currentPage]);

    // To Update the CurrentItems array
    const getUpdatedItems = (items) => {
        // Logic for Updating Friends Lists
        indexOfLastFriend = state.currentPage * itemsPerPage;
        indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
        let currentItem = items.slice(indexOfFirstFriend, indexOfLastFriend);
        return currentItem;
    }

    // Input & Search Component
    const RenderInputComp = <input type="text" value={state.inputData}
                            onChange={(e) => setState({...state, inputData: e.target.value, currentPage: state.currentPage})}
                            placeholder="Enter your friend's name"
                            onKeyPress={(e) => addItem(e)}
                            maxLength="50" />;

    // Friends List Component
    const RenderItemComp = state.items.filter((item, index) => {
                            if (state.inputData === "") {
                                return ((index >= (state.currentPage * itemsPerPage) - itemsPerPage && index < state.currentPage * itemsPerPage));
                            } else if (item.friendName.toLowerCase().includes(state.inputData.toLowerCase())) {
                                return item;
                            }
                            }).map((elem, index) => {
                                return (
                                    <div className="eachItem" key={index}>
                                        <h3>{elem.friendName}</h3>
                                        <div className="todo-btn">
                                            <FontAwesomeIcon icon={faStar} id={'star' + index} className= {'fa-star' + ' ' + (elem.fav === 0 ? 'star-empty' : 'star-filled')} onClick={() => addRemoveFavourite(index, elem.id)} />
                                            <FontAwesomeIcon icon={faTrashAlt} className="fa-trash-alt" onClick={() => deleteItem(index, elem.id)} />
                                        </div>
                                        <div className="friend-text"><br />is your friend</div>
                                    </div>
                                )
                            })

    // Add a friend to list
    const addItem = (e) => {
        if (e.charCode === 13 && state.inputData !== "") {
            const values = { "id": state.items.length, "friendName": state.inputData, "fav": 0 };
            setState({...state, items: [...state.items, values], inputData: ''});            
        }
    }

    // Delete a Friend from list
    const deleteItem = (key, elemId) => {
        const updatedItems = state.items.filter((elem, index) => {
            return elem.id !== elemId;
        });
        let currentItem = getUpdatedItems(updatedItems);
        setState({...state, items: updatedItems});
        if(currentItem.length === 0 && state.currentPage !== 1) {
            const currentPage = state.currentPage - 1;
            setState({...state, items: updatedItems, currentPage: currentPage});
        }
    }

    // Set current Page from Pagination Component
    const setCurrentPages = (pageNo) => {
        setState({...state, currentPage: pageNo});
    }

    // Add a Friend to Favourite
    const addRemoveFavourite = (key, elemId) => {
        let itemArr = state.items.slice();
        for (let i = 0; i < itemArr.length; i++) {
            let item = itemArr[i];
            if (item.id === elemId) {
                if (item.fav === 0) {
                    item.fav = 1;
                    itemArr.splice(i, 1);
                    itemArr.unshift(item);
                    break;
                } else {
                    item.fav = 0;
                    let spliced = itemArr.splice(i, 1);
                    itemArr.push(spliced[0]);
                    break;
                }
            }
        }
        setState({...state, items: itemArr});
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <div className="header-div">
                        <h3>Friends List</h3>
                    </div>
                    <div className="addItems">
                        {RenderInputComp}
                    </div>
                    <div className="showItems">
                        {RenderItemComp}
                    </div>
                    <Pagination items={state.items} currentPage={state.currentPage} parentCallback={setCurrentPages} />
                </div>
            </div>
        </>
    );
};

export default FriendList;