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
  SearchBox,
  DefaultButton,
} from "@fluentui/react";
import CreateUser from "./CreateUser";
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

const TableComponent: FC = () => {
  const [originalUsers, setOriginalUsers] = useState<UsersArray>([]);
  const [users, setUsers] = useState<UsersArray>([]);
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");

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

  const fetchAllUsers = () => {
    fetch("http://localhost:3000/persons")
      .then((response) => response.json())
      .then((data) => {
        setOriginalUsers(data);
        setUsers(data);
      });
  };

  const searchF = () => {
    let filtered = originalUsers;
    if (searchValue.trim() !== "") {
      filtered = filtered.filter((user) =>
        user.userType === selectedOption &&
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setUsers(filtered)
    } else {
      setUsers(originalUsers)
    }
  }

  return (
    <>
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
        <CreateUser />
      </Stack>
      <DetailsListUser users={users} />
    </>
  );
};
export default TableComponent;
