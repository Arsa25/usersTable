import * as React from "react";
import { FC, useState, useEffect, } from "react";
import {
  IIconProps,
  Stack,
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
  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    fetch("http://localhost:3000/persons")
      .then((response) => response.json())
      .then((data) => {
        setOriginalUsers(data);
      });
  };
  return (
    <>
      <DetailsListUser originalUsers={originalUsers} fetchAllUsers={fetchAllUsers} />
    </>
  );
};
export default TableComponent;
