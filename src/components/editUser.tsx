import { FC, useEffect, useMemo, useState, useRef } from "react";
import {
  ActionButton,
  IIconProps,
  Modal,
  IconButton,
  IActivityItemStyles
} from "@fluentui/react";

type User =
  | {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
  }
  | undefined;

const iconButtonStyles = {
  root: {
    marginTop: "4px",
    marginRight: "2px",
  },
};

const actionButtonStyle= {
  root: {
    height:"32px",
    marginLeft:"10px"
  }
}
const addFriendIcon: IIconProps = { iconName: "Edit" };

interface EditUserProps {
  editPropsId: string[];
  fetchAllUsers: () => void;
}

//komponenta
const EditUser: FC<EditUserProps> = ({ editPropsId, fetchAllUsers }) => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [user, setUser] = useState<User>(undefined);
  const [originalUserCopy, setOriginalUserCopy] = useState<User>()
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useMemo(() => {
    setOriginalUserCopy(user);
  }, []);

  useEffect(() => {
    setIsDisabled(editPropsId.length === 1)
  }, [editPropsId])
  useEffect(() => {
    fetchUserById();
  }, [editPropsId]);
  useEffect(() => {
    hendleButtonDisabled();
  }, [user]);

  const fetchUserById = () => {
    if (editPropsId.length === 1) {
      fetch(`http://localhost:3000/persons/${editPropsId}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  };
  //modal
  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      hendleButtonDisabled();
    }, 500);
  };
  const closeModal = () => setIsOpen(false);

  //disable button
  const hendleButtonDisabled = () => {
    const button = document.querySelector(".submitUser") as HTMLButtonElement;
    if (button && user && originalUserCopy) {
      const hendleChange =
        user.name !== originalUserCopy?.name ||
        user.surname !== originalUserCopy.surname ||
        user.userType !== originalUserCopy.userType ||
        user.createdDate !== originalUserCopy.createdDate ||
        user.city !== originalUserCopy.city ||
        user.address !== originalUserCopy.address;
      button.disabled = !hendleChange;
    }
  };

  const editUser = () => {
    if (
      user?.name !== "" &&
      user?.surname !== "" &&
      user?.userType !== "" &&
      user?.createdDate !== "" &&
      user?.city !== "" &&
      user?.address !== ""
    ) {
      //fetchById
      fetch(`http://localhost:3000/persons/${user?.id}`, {
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
          closeModal();
          fetchAllUsers();
        });
    }
  };


  return (
    <>
      {isDisabled &&
        <ActionButton
          styles={actionButtonStyle}
          onClick={() => openModal()}
          iconProps={addFriendIcon}
          allowDisabledFocus
        >
          Edit user
        </ActionButton>}
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
              value={user?.name}
              onChange={(e) => {
                user && setUser({ ...user, name: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Unesite prezime"
              className="input input-prezime"
              required={true}
              value={user?.surname}
              onChange={(e) => {
                user && setUser({ ...user, surname: e.target.value });
              }}
            />
            <span>
              <select value={user?.userType} required={true} name="userType" id="userType" onChange={(e) => user && setUser({ ...user, userType: e.target.value })}>
                <option value="regular">regular</option>
                <option value="admin">admin</option>
              </select>
            </span>
            <input
              type="date"
              placeholder="Unesite datum kreiranja"
              className="input input-email"
              required={true}
              value={user?.createdDate}
              onChange={(e) => {
                user && setUser({ ...user, createdDate: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Unesite grad"
              className="input input-phone"
              required={true}
              value={user?.city}
              onChange={(e) => {
                user && setUser({ ...user, city: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Unesite adresu"
              className="input input-vrtic"
              required={true}
              value={user?.address}
              onChange={(e) => {
                user && setUser({ ...user, address: e.target.value });
              }}
            />

            <button type="submit" className="submitUser">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditUser;
