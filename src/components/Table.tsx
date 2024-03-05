import * as React from 'react';
import { FC, useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
} from '@fluentui/react-components';
import {
    Stack,
    PrimaryButton,
    IIconProps,
    IComboBoxOption,
    SelectableOptionMenuItemType,
    ComboBox, IComboBoxStyles,
    IComboBox,
    ISearchBoxStyles,
    ISearchBox,
    SearchBox
} from '@fluentui/react';
import CreateUser from './CreateUser';


type User = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
}
type UsersArray = User[];


type Column = {
    columnKey: string;
    label: string;
};
const columns: Column[] = [
    { columnKey: 'name', label: 'Name' },
    { columnKey: 'surname', label: 'SurName' },
    { columnKey: 'userType', label: 'UserType' },
    { columnKey: 'createdDate', label: 'CreatedDate' },
    { columnKey: 'city', label: 'City' },
    { columnKey: 'address', label: 'Address' },
];


const addFriendIcon: IIconProps = { iconName: 'AddFriend' };
//comboBox
const options: IComboBoxOption[] = [
    { key: 'Header1', text: 'User types', itemType: SelectableOptionMenuItemType.Header },
    { key: 'All', text: 'All' },
    { key: 'A', text: 'regular' },
    { key: 'B', text: 'admin' }
]

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 110 } };

//searchBox
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };



const Tablee: FC = () => {
    const [originalUsers, setOriginalUsers] = useState<UsersArray>([]);
    const [users, setUsers] = useState<UsersArray>([])
    const [selectedOption, setSelectedOption] = useState<string>('All');
    const [searchValue, setSearchValue] = useState<string>('');
    const [checkedRows, setCheckedRows] = useState({});

    const fetchAllUsers = () => {
        fetch('http://localhost:3000/persons')
            .then(response => response.json())
            .then(data => {
                setOriginalUsers(data)
                setUsers(data)
            });
    }

    useEffect(() => {
        fetchAllUsers()
    }, [originalUsers]);

    useMemo(() => {
        let filtered = originalUsers
        if (selectedOption !== 'All') {
            filtered = filtered.filter(user => user.userType === selectedOption)
        }
        if (searchValue.trim() !== '') {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else {

        }
        setUsers(filtered)
    }, [selectedOption, searchValue, originalUsers])

    //comboBox
    const comboBoxRef = useRef<IComboBox>(null);
    const onOpenClick = useCallback(() => comboBoxRef.current?.focus(true), []);


    //iscrtavanje tabele
    const userRows = users.map(user => (
        <TableRow style={{ borderBottomColor: "grey", borderBottomWidth: "1px" }} key={user.id}>
            <TableCell>
                <TableCellLayout>
                    {user.name}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                {user.surname}
            </TableCell>
            <TableCell>
                <TableCellLayout>
                    {user.userType}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                <TableCellLayout>
                    {user.createdDate}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                <TableCellLayout>
                    {user.city}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                <TableCellLayout>
                    {user.address}
                </TableCellLayout>
            </TableCell>
            <TableCell>
                {/* <TableCellLayout>
                    <input
                        type='checkbox'
                        onChange={(event) => handleCheckboxChange(user.id, event)} />
                </TableCellLayout> */}
            </TableCell>
        </TableRow>
    ))
    //iscrtavanje headera tabele
    const tableHeader = columns.map(column => (
        <TableHeaderCell style={{ fontSize: "1.2rem" }} key={column.columnKey}>{column.label}</TableHeaderCell>
    ))

    // const handleCheckboxChange = (userId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    //     const isChecked = (event.target.checked)
    //     if (isChecked) {
    //         setCheckedRows(prevCheckedRows => ({
    //             ...prevCheckedRows,
    //             [userId]: true 
    //         }));
    //     }
    //     else {
    //         setCheckedRows(prevCheckedRows => {
    //             const updatedCheckedRows = { ...prevCheckedRows };
    //             delete updatedCheckedRows[userId]; // Brišemo određeni ID iz objekta
    //             return updatedCheckedRows; // Vraćamo novi objekat bez izbrisane stavke
    //         });
    //     }
    // }

return (<>
    <Stack horizontal horizontalAlign="start">
        <CreateUser fetchAllUsers={fetchAllUsers} />
        <ComboBox
            componentRef={comboBoxRef}
            defaultSelectedKey="All"
            options={options}
            onItemClick={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => { setSelectedOption(option?.text || 'All') }}
            styles={comboBoxStyles}

        />
        <SearchBox
            styles={searchBoxStyles}
            placeholder="Search"
            value={searchValue}
            onChange={(event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => { setSearchValue(newValue || '') }}
        />
    </Stack>
    <Stack>
        <Table arial-label="Default table">
            <TableHeader>
                <TableRow>
                    {tableHeader}
                </TableRow>
            </TableHeader>
            <TableBody>
                {userRows}
            </TableBody>
        </Table>
    </Stack>
</>
);
}


export default Tablee