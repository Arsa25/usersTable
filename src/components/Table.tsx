import * as React from "react";
import { FC, useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
} from "@fluentui/react-components";
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
} from "@fluentui/react";
import CreateUser from "./CreateUser";
import EditUser from "./editUser";
import { isForInStatement } from "typescript";

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
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

//delete
const deleteButtonStyles: Partial<IButtonStyles> = {
  root: {
    backgroundColor: "red",
    fontSize: "1.1rem",
    border: "none",
    margin: "0 20px 0 auto",
  },
};

const Tablee: FC = () => {
  const [originalUsers, setOriginalUsers] = useState<UsersArray>([]);
  const [users, setUsers] = useState<UsersArray>([]);
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

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
  }, [originalUsers]);

  useMemo(() => {
    let filtered = originalUsers;
    if (selectedOption !== "All") {
      filtered = filtered.filter((user) => user.userType === selectedOption);
    }
    if (searchValue.trim() !== "") {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
    }
    setUsers(filtered);
  }, [selectedOption, searchValue, originalUsers]);

  //comboBox
  const comboBoxRef = useRef<IComboBox>(null);
  const onOpenClick = useCallback(() => comboBoxRef.current?.focus(true), []);

  //iscrtavanje tabele
  const userRows = users.map((user) => (
    <TableRow
      style={{ borderBottomColor: "grey", borderBottomWidth: "1px" }}
      key={user.id}
    >
      <TableCell>
        <TableCellLayout>{user.name}</TableCellLayout>
      </TableCell>
      <TableCell>{user.surname}</TableCell>
      <TableCell>
        <TableCellLayout>{user.userType}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{user.createdDate}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{user.city}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>{user.address}</TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout>
          <input
            type="checkbox"
            onChange={(event) => {
              handleCheckboxChange(user.id, event);
            }}
          />
        </TableCellLayout>
      </TableCell>
    </TableRow>
  ));
  //iscrtavanje headera tabele
  const tableHeader = columns.map((column) => (
    <TableHeaderCell style={{ fontSize: "1.2rem" }} key={column.columnKey}>
      {column.label}
    </TableHeaderCell>
  ));

  const handleCheckboxChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    const isHere = checkedRows.includes(id);
    if (isChecked || isHere === false) {
      setCheckedRows([...checkedRows, id]);
    } else if (isChecked === false && isHere) {
      setCheckedRows(checkedRows.filter((elem) => elem !== id));
    }
  };
  //delete

  const deleteUsers = (arrId: Array<string>) => {
    if (arrId.length !== 0) {
      if (window.confirm("Da li ste sigurni")) {
        arrId.map((id) => {
          fetch(`http://localhost:3000/persons/${id}`, {
            method: "DELETE",
          });
        });
      }
    } else {
      alert("Niste selektovali korisnika");
    }
  }

  return (
    <>
      <div className="modalDelete">
        <h2>Da li ste sigurni?</h2>
        <span>
          <button className="btn">Yes</button>
          <button className="btn">No</button>
        </span>
      </div>
      <Stack horizontal horizontalAlign="start">
        <CreateUser fetchAllUsers={fetchAllUsers} />
        <ComboBox
          componentRef={comboBoxRef}
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
          onChange={(
            event?: React.ChangeEvent<HTMLInputElement>,
            newValue?: string
          ) => {
            setSearchValue(newValue || "");
          }}
        />
        <PrimaryButton
          text="Delete"
          allowDisabledFocus
          disabled={props.disabled}
          checked={props.checked}
          iconProps={deleteIcon}
          styles={deleteButtonStyles}
          onClick={() => {
            deleteUsers(checkedRows);
          }}
        />
        <EditUser editPropsId={checkedRows} fetchAllUsers={fetchAllUsers} />
      </Stack>
      <Stack>
        <Table arial-label="Default table">
          <TableHeader>
            <TableRow>{tableHeader}</TableRow>
          </TableHeader>
          <TableBody>{userRows}</TableBody>
        </Table>
      </Stack>
    </>
  );
};

export default Tablee;
