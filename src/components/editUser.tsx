import { FC, useMemo, useState } from "react";
import {
  ActionButton,
  IIconProps,
  Modal,
  IconButton,
  getTheme,
} from "@fluentui/react";
import { v4 as uuidv4 } from "uuid";

type User = {
  id: string;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
};

const iconButtonStyles = {
  root: {
    marginTop: "4px",
    marginRight: "2px",
  },
};
const addFriendIcon: IIconProps = { iconName: "Edit" };

interface EditUserProps {
  editProps: User;
  fetchAllUsers: () => void;
}

//komponenta
const EditUser: FC<EditUserProps> = ({ editProps,fetchAllUsers }) => {
  type IButtonProps = {
    disabled?: boolean;
    checked?: boolean;
  };

  const props: IButtonProps = { disabled: false, checked: false };

  const [user, setUser] = useState({
    id: editProps.id,
    name: editProps.name,
    surname: editProps.surname,
    userType: editProps.userType,
    createdDate: editProps.createdDate,
    city: editProps.city,
    address: editProps.address,
  });

  //modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const editUser = (e: any) => {
    e.preventDefault();

    if (
      user.name !== "" &&
      user.surname !== "" &&
      user.userType !== "" &&
      user.createdDate !== "" &&
      user.city !== "" &&
      user.address !== ""
    ) {
      //fetchById
      fetch(`http://localhost:3000/persons/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error updating data:", error));

      closeModal();
      fetchAllUsers();
    }
  };
  return (
    <>
      <ActionButton
        onClick={openModal}
        iconProps={addFriendIcon}
        allowDisabledFocus
        disabled={props.disabled}
        checked={props.checked}
      >
        Edit user
      </ActionButton>
      <Modal isOpen={isOpen} onDismiss={closeModal} isBlocking={false}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Edit user</h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close modal"
            onClick={closeModal}
            styles={iconButtonStyles}
          />
        </span>
        <div className="containerEmployeeAdd">
          <form className="addUser" onSubmit={editUser}>
            <input
              type="text"
              placeholder="Unesite ime"
              className="input input-ime"
              required={true}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unesite prezime"
              className="input input-prezime"
              required={true}
              value={user.surname}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unesite tip korisnika"
              className="input input-adrtesa"
              required={true}
              value={user.userType}
              onChange={(e) => setUser({ ...user, userType: e.target.value })}
            />
            <input
              type="date"
              placeholder="Unesite datum kreiranja"
              className="input input-email"
              required={true}
              value={user.createdDate}
              onChange={(e) =>
                setUser({ ...user, createdDate: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unesite grad"
              className="input input-phone"
              required={true}
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unesite adresu"
              className="input input-vrtic"
              required={true}
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />

            <input type="submit" placeholder="Submit" className="submitUser" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default EditUser;
