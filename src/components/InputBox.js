import React from 'react';

function InputBox({ state, updateState }) {

    // Add a friend to list
    const addItem = (e) => {
        if (e.charCode === 13 && state.inputData !== "") {
            const values = { "id": state.items.length, "friendName": state.inputData, "fav": 0 };
            updateState({ ...state, items: [...state.items, values], inputData: '' });
        }
    }

    return (
        <>
            <input type="text" value={state.inputData}
                onChange={(e) => updateState({ ...state, inputData: e.target.value, currentPage: state.currentPage })}
                placeholder="Enter your friend's name"
                onKeyPress={(e) => addItem(e)}
                maxLength="50" />
        </>
    );
}

export default InputBox;