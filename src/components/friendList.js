import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css'
import Pagination from './pagination';
import InputBox from './InputBox';
import ListItem from './ListItem';

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

    // To update the State from other Components
    const updateState = (updatedStateValue) => {
        setState(updatedStateValue)
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <div className="header-div">
                        <h3>Friends List</h3>
                    </div>
                    <div className="addItems">
                        <InputBox state={state} updateState={updateState} />
                    </div>
                    <div className="showItems">
                        <ListItem state={state} getUpdatedItems={getUpdatedItems} updateState={updateState} itemsPerPage={itemsPerPage} />
                    </div>
                    <Pagination state={state} currentPage={state.currentPage} updateState={updateState} itemsPerPage={itemsPerPage} currentPage={state.currentPage} />
                </div>
            </div>
        </>
    );
};

export default FriendList;