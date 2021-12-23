import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ListItem({ state, updateState, getUpdatedItems, itemsPerPage }) {

    // Delete a Friend from list
    const deleteItem = (key, elemId) => {
        const updatedItems = state.items.filter((elem, index) => {
            return elem.id !== elemId;
        });
        let currentItem = getUpdatedItems(updatedItems);
        updateState({ ...state, items: updatedItems });
        if (currentItem.length === 0 && state.currentPage !== 1) {
            const currentPage = state.currentPage - 1;
            updateState({ ...state, items: updatedItems, currentPage: currentPage });
        }
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
        updateState({ ...state, items: itemArr });
    }

    return (
        state.items.filter((item, index) => {
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
                        <FontAwesomeIcon icon={faStar} id={'star' + index} className={'fa-star' + ' ' + (elem.fav === 0 ? 'star-empty' : 'star-filled')} onClick={() => addRemoveFavourite(index, elem.id)} />
                        <FontAwesomeIcon icon={faTrashAlt} className="fa-trash-alt" onClick={() => deleteItem(index, elem.id)} />
                    </div>
                    <div className="friend-text"><br />is your friend</div>
                </div>
            )
        })
    );
}

export default ListItem;