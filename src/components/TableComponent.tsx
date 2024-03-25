import * as React from "react";
import { FC, useState, useEffect, } from "react";
import {
  Stack,
  IIconProps,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  ComboBox,
  IComboBoxStyles,
  IComboBox,
  ISearchBoxStyles,
  IButtonStyles,
  ISearchBox,
  SearchBox,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { isForInStatement } from "typescript";
import DetailsListUser from "./DetailsList/DetailsListUser";

type User = {
  id: string;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
};
type UsersArray = User[];

type Column = {
  columnKey: string;
  label: string;
};
const columns: Column[] = [
  { columnKey: "name", label: "Name" },
  { columnKey: "surname", label: "SurName" },
  { columnKey: "userType", label: "UserType" },
  { columnKey: "createdDate", label: "CreatedDate" },
  { columnKey: "city", label: "City" },
  { columnKey: "address", label: "Address" },
];

const deleteIcon: IIconProps = { iconName: "delete" };
//comboBox
const options: IComboBoxOption[] = [
  {
    key: "Header1",
    text: "User types",
    itemType: SelectableOptionMenuItemType.Header,
  },
  { key: "All", text: "All" },
  { key: "A", text: "regular" },
  { key: "B", text: "admin" },
];

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 110 } };

//searchBox
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, margin: "0 2px 0 10px " } };

//delete
const deleteButtonStyles: Partial<IButtonStyles> = {
  root: {
    fontSize: "1.1rem",
    border: "none"
  },
}

const TableComponent: FC = () => {
  const [originalUsers, setOriginalUsers] = useState<UsersArray>([]);
  const [users, setUsers] = useState<UsersArray>([]);
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [isModalBtnVisible, setIsModalBtnVisible] = useState(false);

  type IButtonProps = {
    disabled?: boolean;
    checked?: boolean;
  };

  const props: IButtonProps = { disabled: false, checked: false };


  const fetchAllUsers = () => {
    fetch("http://localhost:3000/persons")
      .then((response) => response.json())
      .then((data) => {
        setOriginalUsers(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    let filtered = originalUsers;
    if (selectedOption !== "All") {
      filtered = filtered.filter((user) => user.userType === selectedOption);
      setUsers(filtered);
    } else {
      setUsers(originalUsers)
    }
  }, [selectedOption])

  const searchF = () => {
    let filtered = originalUsers;
    if (searchValue.trim() !== "") {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setUsers(filtered)
    } else {
      setUsers(originalUsers)
    }
  }

  //comboBox
  // const comboBoxRef = useRef<IComboBox>(null);
  // const onOpenClick = useCallback(() => comboBoxRef.current?.focus(true), []);

  // checkBox
  const handleCheckboxChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    const isHere = checkedRows.includes(id);
    if (isChecked || !isHere) {
      setCheckedRows([...checkedRows, id]);
    } else if (!isChecked && isHere) {
      setCheckedRows(checkedRows.filter((elem) => elem !== id));
    }
  };
  //delete
  const deleteUsers = (arrId: Array<string>) => {
    if (arrId.length !== 0) {
      fetch(`http://localhost:3000/persons/deleteUsers`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: arrId })
      }).then(response => {
        if (response.ok) {
          alert('Korisnici su uspešno obrisani.');
        } else {
          alert('Došlo je do greške prilikom brisanja korisnika.');
        }
      }).catch(error => {
        console.error('Došlo je do greške prilikom slanja zahteva:', error);
        alert('Došlo je do greške prilikom slanja zahteva za brisanje korisnika.');
      });
    } else {
      alert('Niste selektovali korisnika');
    }
  }

  return (
    <>
      {isModalBtnVisible &&
        <div className="modalDelete">
          <h2>Da li ste sigurni?</h2>
          <span>
            <button onClick={() => {
              deleteUsers(checkedRows)
              setIsModalBtnVisible(false)
            }} className="btn">Yes</button>
            <button onClick={() => setIsModalBtnVisible(false)} className="btn">No</button>
          </span>
        </div>}
      <Stack horizontal horizontalAlign="start">
        <ComboBox
          defaultSelectedKey="All"
          options={options}
          onItemClick={(
            event: React.FormEvent<IComboBox>,
            option?: IComboBoxOption,
            index?: number
          ) => {
            setSelectedOption(option?.text || "All");
          }}
          styles={comboBoxStyles}
        />
        <SearchBox
          styles={searchBoxStyles}
          placeholder="Search"
          value={searchValue}
          onChange={(event, newValue) => setSearchValue(newValue || "")}
        />
        < DefaultButton
          text="search"
          onClick={() => searchF()}
        />
        <div className="btnContainer">
          {
            checkedRows.length > 0 &&
            <PrimaryButton
              text="Delete"
              allowDisabledFocus
              disabled={props.disabled}
              checked={props.checked}
              iconProps={deleteIcon}
              styles={deleteButtonStyles}
              onClick={() => {
                setIsModalBtnVisible(true)
              }}
            />}
          <EditUser editPropsId={checkedRows} fetchAllUsers={fetchAllUsers} />
        </div>
        <CreateUser fetchAllUsers={fetchAllUsers} />
      </Stack>
      <DetailsListUser users={users} />
    </>
  );
};
export default TableComponent;

// const filteredPersons = details.filter(person => {
//   return (
//     person.name.toLowerCase().includes(searchField.toLowerCase()) || person.email.toLowerCase().includes(searchField.toLowerCase())
//     );
//   }
// );
