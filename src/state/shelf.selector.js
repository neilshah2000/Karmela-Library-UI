export const getShelfDropDown = (state) => {
    return state.shelf.all.concat([{
            id: false,
            name: ' -- select an option -- '
        }
    ])
}