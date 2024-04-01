import { FC, useEffect, useState, useRef } from "react";
import {
  Modal,
  IconButton, ActionButton, IIconProps
} from "@fluentui/react"

type User = {
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

interface EditUserProps {
  editPropsId: string | undefined
  hendleEditModal: React.Dispatch<React.SetStateAction<boolean>>
  
}

//komponenta
const EditUser: FC<EditUserProps> = ({ editPropsId,hendleEditModal }) => {
  const submitUser = useRef<HTMLButtonElement>(null)

  const [user, setUser] = useState<User>(undefined);
  const [originalUserCopy, setOriginalUserCopy] = useState<User>()
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isModalOpen = (bool: boolean) => {
    setIsOpen(!bool)
    hendleEditModal(!bool)
  }

  useEffect(() => {
    fetchUserById();
  }, [editPropsId]);
  useEffect(() => {
    hendleButtonDisabled();
  }, [user, isOpen]);


  //GET byId
  const fetchUserById = () => {
    editPropsId && fetch(`http://localhost:3000/persons/${editPropsId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
        setOriginalUserCopy(data)
      })
      .catch((error) => console.error("Error fetching data:", error))
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
      //PUT
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
        window.location.reload()
      });
    }
  };
  //disable button

  const hendleButtonDisabled = () => {
    if (submitUser.current && user && originalUserCopy) {

      const hendleChange =
        user.name !== originalUserCopy?.name ||
        user.surname !== originalUserCopy.surname ||
        user.userType !== originalUserCopy.userType ||
        user.createdDate !== originalUserCopy.createdDate ||
        user.city !== originalUserCopy.city ||
        user.address !== originalUserCopy.address

      submitUser.current!.disabled = !hendleChange
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} isBlocking={false}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Edit user</h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close modal"
            onClick={() => isModalOpen(true)}
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
            <button type="submit" className="submitUser" disabled ref={submitUser}>
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditUser;
