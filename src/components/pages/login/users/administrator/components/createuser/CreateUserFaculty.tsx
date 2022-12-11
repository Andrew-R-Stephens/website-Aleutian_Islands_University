import {Fragment} from "react";

function CreateUserFaculty(props:any) {
    const {changePage, createUser} = props;

    return (
        <Fragment>
            <h1>Create Faculty</h1>
            <form onSubmit={()=>createUser({firstN:'Andrew', lastN:'Stephens'})}>
                <fieldset>
                    <button type={'submit'}>Create</button>
                    <button type={'button'} onClick={changePage}>Cancel</button>
                </fieldset>
            </form>

        </Fragment>
    );
}

export default CreateUserFaculty;