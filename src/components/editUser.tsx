import { FC, useEffect, useMemo, useState,useRef } from "react";
import {
  ActionButton,
  IIconProps,
  Modal,
  IconButton,
  getTheme,
} from "@fluentui/react";

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
const EditUser: FC<EditUserProps> = ({ editProps, fetchAllUsers }) => {
  type IButtonProps = {
    disabled?: boolean;
    checked?: boolean;
  };
  const props: IButtonProps = { disabled: false, checked: false };

  const modal = document.querySelector(".modal") as HTMLDivElement

  const [user, setUser] = useState({
    id: editProps.id,
    name: editProps.name,
    surname: editProps.surname,
    userType: editProps.userType,
    createdDate: editProps.createdDate,
    city: editProps.city,
    address: editProps.address,
  });
  const [originalUserCopy, setOriginalUserCopy] = useState<User>()
  useMemo(() => { setOriginalUserCopy(user) }, [])


  //modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true)
    setTimeout(() => {
      hendleButtonDisabled()
    }, 500)
  };
  const closeModal = () => setIsOpen(false);


  //disable button
  useEffect(() => {
    hendleButtonDisabled();
  }, [user]);
  const hendleButtonDisabled = () => {
    const button = document.querySelector(".submitUser") as HTMLButtonElement
    if (button) {
      const hendleChange = user.name !== originalUserCopy?.name ||
        user.surname !== originalUserCopy.surname ||
        user.userType !== originalUserCopy.userType ||
        user.createdDate !== originalUserCopy.createdDate ||
        user.city !== originalUserCopy.city ||
        user.address !== originalUserCopy.address
      button.disabled = !hendleChange
    }

  }

  const editUser = () => {

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
        .catch((error) => console.error("Error updating data:", error))
        .finally(() => {
          closeModal()
          fetchAllUsers()
        });
    }
  }
 
  // //custom modal

  //  // **Custom modal state controlled by useRef**
  //  const isCustomModalOpenRef = useRef<boolean>(false);
  

  // // **Open custom modal controlled by useRef**
  // const openCustomModal = () => {
  //   isCustomModalOpenRef.current = true;
  // };

  // // **Close custom modal controlled by useRef**
  // const closeCustomModal = () => {
  //   isCustomModalOpenRef.current = false;
  // };
  // const customModalComponent =
  //   isCustomModalOpenRef.current && createPortal(
  //     <CustomModal closeModal={closeCustomModal} />,
  //     document.body
  //   );

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
              onChange={(e) => {
                setUser({ ...user, name: e.target.value })
              }}
            />
            <input
              type="text"
              placeholder="Unesite prezime"
              className="input input-prezime"
              required={true}
              value={user.surname}
              onChange={(e) => {
                setUser({ ...user, surname: e.target.value })
              }}
            />
            <input
              type="text"
              placeholder="Unesite tip korisnika"
              className="input input-adrtesa"
              required={true}
              value={user.userType}
              onChange={(e) => {
                setUser({ ...user, userType: e.target.value })
              }}
            />
            <input
              type="date"
              placeholder="Unesite datum kreiranja"
              className="input input-email"
              required={true}
              value={user.createdDate}
              onChange={(e) => {
                setUser({ ...user, createdDate: e.target.value })
              }
              }
            />
            <input
              type="text"
              placeholder="Unesite grad"
              className="input input-phone"
              required={true}
              value={user.city}
              onChange={(e) => {
                setUser({ ...user, city: e.target.value })
              }}
            />
            <input
              type="text"
              placeholder="Unesite adresu"
              className="input input-vrtic"
              required={true}
              value={user.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value })
              }}
            />

            <button type="submit" className="submitUser">Submit</button>
          </form>
        </div>
      </Modal>      
    </>
  )
}

export default EditUser
