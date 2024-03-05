import { FC } from "react";
import { ActionButton, IIconProps, Modal, IconButton, getTheme } from '@fluentui/react';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const theme = getTheme()
type User = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
}
type UsersArray = User[];

const iconButtonStyles = {
    root: {
        marginTop: '4px',
        marginRight: '2px',
    }
}
const addFriendIcon: IIconProps = { iconName: 'AddFriend' };
//createUser

interface CreateUserProps {
    fetchAllUsers: () => void;
}
const CreateUser: FC<CreateUserProps> = ({ fetchAllUsers }) => {

    type IButtonProps = {
        disabled?: boolean;
        checked?: boolean;
    }
    const props: IButtonProps = { disabled: false, checked: false }
    const [user, setUser] = useState({ id: "", name: "", surname: "", userType: "", createdDate: "", city: "", address: "" })

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    //modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createUser = (e: any) => {
        e.preventDefault()

        if (user.name !== "" && user.surname !== "" && user.userType !== "" && user.createdDate !== "" && user.city !== "" && user.address !== "") {

            const userId = uuidv4()
            setUser({ ...user, id: userId });
            console.log(userId);
            
            //fetch
            fetch("http://localhost:3000/persons", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parsiranje JSON odgovora
                })
                .then(data => {
                    console.log('Post je uspešno kreiran:', data);
                })
                .catch(error => {
                    console.error('Došlo je do greške prilikom slanja POST zahteva:', error);
                });
            closeModal()
            fetchAllUsers()
        }

    }
    return (
        <>
            <ActionButton onClick={openModal} iconProps={addFriendIcon} allowDisabledFocus disabled={props.disabled} checked={props.checked}>
                Create user
            </ActionButton>
            <Modal
                isOpen={isOpen}
                onDismiss={closeModal}
                isBlocking={false}
            >

                <span style={{ display: "flex", justifyContent: 'space-between' }}>
                    <h2>Create user</h2>
                    <IconButton
                        iconProps={{ iconName: 'Cancel' }}
                        ariaLabel="Close modal"
                        onClick={closeModal}
                        styles={iconButtonStyles}
                    />
                </span>
                <div className="containerEmployeeAdd">
                    <form className="addUser" onSubmit={createUser}>
                        <input type="text" placeholder="Unesite ime" className="input input-ime" required={true} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        <input type="text" placeholder="Unesite prezime" className="input input-prezime" required={true} onChange={(e) => setUser({ ...user, surname: e.target.value })} />
                        <input type="text" placeholder="Unesite tip korisnika" className="input input-adrtesa" required={true} onChange={(e) => setUser({ ...user, userType: e.target.value })} />
                        <input type="date" placeholder="Unesite datum kreiranja" className="input input-email" required={true} onChange={(e) => setUser({ ...user, createdDate: e.target.value })} />
                        <input type="text" placeholder="Unesite grad" className="input input-phone" required={true} onChange={(e) => setUser({ ...user, city: e.target.value })} />
                        <input type="text" placeholder="Unesite adresu" className="input input-vrtic" required={true} onChange={(e) => setUser({ ...user, address: e.target.value })} />

                        <input type="submit" placeholder="Submit" className="submitUser" />
                    </form>
                </div>
            </Modal>
        </>
    )
}
export default CreateUser;