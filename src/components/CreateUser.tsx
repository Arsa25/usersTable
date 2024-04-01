import { FC, useState, useRef, useEffect } from "react";
import {
  Modal,
  IconButton,
} from "@fluentui/react";
import { v4 as uuidv4 } from "uuid";

const iconButtonStyles = {
  root: {
    marginTop: "4px",
    marginRight: "2px",
  },
};
interface IProps {
  hendleCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateUser: FC<IProps> = ({hendleCreateModal}) => {
  const submitUser = useRef<HTMLButtonElement>(null)
  const [user, setUser] = useState({
    id: "",
    name: "",
    surname: "",
    userType: "regular",
    createdDate: "",
    city: "",
    address: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isModalOpen = (bool: boolean) => {
    setIsOpen(!bool)
    hendleCreateModal(!bool)    
  }

  useEffect(() => {
    hendleButtonDisabled()
  }, [user])
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
      isModalOpen(true)
      window.location.reload()
    }
  };
  const hendleButtonDisabled = () => {
    if (submitUser.current && user) {

      const hendleChange =
        user.name !== "" &&
        user.surname !== "" &&
        user.userType !== "" &&
        user.createdDate !== "" &&
        user.city !== "" &&
        user.address !== ""

      submitUser.current!.disabled = !hendleChange
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} isBlocking={false}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Create user</h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close modal"
            onClick={() => isModalOpen(true)}
            styles={iconButtonStyles}
          />
        </span>
        <div className="containerEmployeeAdd">
          <form className="addUser" noValidate onSubmit={createUser}>
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

            <button type="submit" className="submitUser" disabled ref={submitUser} >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default CreateUser;
