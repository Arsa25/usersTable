import { FC } from "react";
import {
  ActionButton,
  IIconProps,
  Modal,
  IconButton,
} from "@fluentui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const iconButtonStyles = {
  root: {
    marginTop: "4px",
    marginRight: "2px",
  },
};
const addFriendIcon: IIconProps = { iconName: "AddFriend" };

//komponenta
const CreateUser: FC = () => {

  const [user, setUser] = useState({
    id: "",
    name: "",
    surname: "",
    userType: "regular",
    createdDate: "",
    city: "",
    address: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // type IButtonProps = {
  //   disabled?: boolean;
  //   checked?: boolean;
  // };
  // const actionButtonProps: IButtonProps = { disabled: false, checked: false };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const createUser = (e: any) => {
    e.preventDefault();
    const userId = uuidv4();
    setUser({ ...user, id: userId });
    if (
      user.id !== "" &&
      user.name !== "" &&
      user.surname !== "" &&
      user.userType !== "" &&
      user.createdDate !== "" &&
      user.city !== "" &&
      user.address !== ""
    ) {
      console.log(user);
      //fetch
      fetch("http://localhost:3000/persons", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Post je uspešno kreiran:", data);
        })
        .catch((error) => {
          console.error(
            "Došlo je do greške prilikom slanja POST zahteva:",
            error
          );
        });
      closeModal();
    }
  };
  return (
    <>
      <ActionButton
        onClick={openModal}
        iconProps={addFriendIcon}
        allowDisabledFocus
      >
        Create user
      </ActionButton>
      <Modal isOpen={isOpen} onDismiss={closeModal} isBlocking={false}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Create user</h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close modal"
            onClick={closeModal}
            styles={iconButtonStyles}
          />
        </span>
        <div className="containerEmployeeAdd">
          <form className="addUser" onSubmit={createUser}>
            <input
              type="text"
              placeholder="Unesite ime"
              className="input input-ime"
              required={true}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unesite prezime"
              className="input input-prezime"
              required={true}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
            <span>
              <select value={user?.userType || "regular"} required={true} name="userType" id="userType" onChange={(e) => setUser({ ...user, userType: e.target.value || "regular" })}>
                <option value="regular">regular</option>
                <option value="admin">admin</option>
              </select>
            </span>
            <input
              type="date"
              placeholder="Unesite datum kreiranja"
              className="input input-email"
              required={true}
              onChange={(e) =>
                setUser({ ...user, createdDate: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unesite grad"
              className="input input-phone"
              required={true}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Unesite adresu"
              className="input input-vrtic"
              required={true}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />

            <input type="submit" placeholder="Submit" className="submitUser" />
          </form>
        </div>
      </Modal>
    </>
  );
};
export default CreateUser;
