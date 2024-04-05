import * as React from "react";
import { FC, useState, useEffect, } from "react";
import {
  IIconProps,
  Stack,
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBox,
  IComboBoxStyles,
  SearchBox,
  ISearchBoxStyles,
  DefaultButton,
} from "@fluentui/react";
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
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { width: 80 } };
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, margin: "0 2px 0 10px " } };
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
]

const TableComponent: FC = () => {
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(originalUsers)
  const [selectedOption, setSelectedOption] = useState<string>("All")
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    setFilteredUsers(originalUsers)
  }, [originalUsers]);
  useEffect(() => {
    fetchAllUsers();
  }, [])
  useEffect(() => {
    if (selectedOption !== "All") {
      setFilteredUsers(originalUsers.filter((user) => user.userType === selectedOption));
    } else {
      setFilteredUsers(originalUsers)
    }
  }, [selectedOption])

  const fetchAllUsers = () => {
    fetch("http://localhost:3000/persons")
      .then((response) => response.json())
      .then((data) => {
        setOriginalUsers(data);
      })
  }
  const searchUsers = (filteredUsers: User[]) => {
    if (searchValue.trim() !== "") {
      setFilteredUsers(filteredUsers.filter((user) =>
        user.userType === selectedOption || selectedOption === "All" &&
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      ))

    } else {
      setFilteredUsers(originalUsers)
    }
  }
  return (
    <Stack>
      //comboBox, searchBox and button
      <Stack horizontal >
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
          onClick={() => searchUsers(filteredUsers)}
        />
      </Stack>
      
      <DetailsListUser filteredUsers={filteredUsers} fetchAllUsers={fetchAllUsers} />
    </Stack>
  );
};
export default TableComponent;
