import React from "react";
/*

const useStore = () => {
    const [id, setID] = useState('-1');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return {
        id,
        email,
        firstName,
        lastName,

        login: (data:any) => {
            const {id, email, firstName, lastName} = queryUser(data.id);

            setID(id);
            setID('6');
            setEmail(email);
            setFirstName(firstName);
            setLastName(lastName)
        },
        logout: () => {
            setID('-1');
            setEmail('');
            setFirstName('');
            setLastName('')
        }
    }
}

function queryUser(id:any):any {
    axios.get(process.env["REACT_APP_API_USER"] as string, {
        params: {
            func: "standard",
            id
        }
    }).then(res => {
        return res.data;
    }).catch(function(err) {
        console.log(err.message);
    })
}

const StoreContext = React.createContext<any>(null);
/!*

export const StoreContextProvider = (children: any) => (
    <StoreContext.Provider value={children}>
        {children.getID}
    </StoreContext.Provider>
)
*!/

export const useLogin = () => useContext(StoreContext).login;
export const useLogout = () => useContext(StoreContext).logout;
export const getID = () => useContext(StoreContext).id;
export const getEmail = () => useContext(StoreContext).email;
export const getFirstName = () => useContext(StoreContext).firstName;
export const getLastName = () => useContext(StoreContext).lastName;
*/