import { FC, useState, useEffect } from "react"
import {
    DetailsList,
    IColumn,
    mergeStyleSets,
    Checkbox,
    SelectionMode,
    Stack,
    PrimaryButton,
    IButtonStyles,
    IIconProps,
    IDetailsListStyles,
    IStackTokens,
    IStackStyles,
    ComboBox,
    SearchBox,
    DefaultButton,
    IComboBox,
    IComboBoxOption,
    SelectableOptionMenuItemType,
    IComboBoxStyles,
    ISearchBoxStyles
} from "@fluentui/react";
import EditUser from "../EditUser";
import CreateUser from "../CreateUser";
import DeleteModalAlert from "../DeleteModalAlert";

type User = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
};
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
//styles
//searchBox
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, margin: "0 2px 0 10px " } };
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { width: 80 } };
const stackStyles: IStackStyles = {
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        padding: "0px 50px 0px 0",
    },
};
const containerStackTokens: IStackTokens = { childrenGap: 5 };
const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
        position: "absolute",
        top: "80px",
        marginRight: "50px",
        paddingBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        overflow: "hidden",
    }
}
const classNames = mergeStyleSets({
    fileIconCell: {
        fontSize: '1rem',
    },
    headerClassName: {
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
});
const editFriendIcon: IIconProps = { iconName: "Edit" }
const addFriendIcon: IIconProps = { iconName: "AddFriend" }

const actionButtonStyle = {
    root: {
        height: "32px",
        marginLeft: "10px"
    }
}
const deleteButtonStyles: Partial<IButtonStyles> = {
    root: {
        fontSize: "1.1rem",
        border: "none"
    },
}
const deleteIcon: IIconProps = { iconName: "delete" };

interface UserRenderProps {
    originalUsers: User[]
    serOriginalUsers: React.Dispatch<React.SetStateAction<User[]>>
    fetchAllUsers: () => void
}
const DetailsListUser: FC<UserRenderProps> = ({ originalUsers, serOriginalUsers,fetchAllUsers }) => {
    const [users, setUsers] = useState<User[]>(originalUsers)
    const [searchValue, setSearchValue] = useState<string>("")
    const [selectedOption, setSelectedOption] = useState<string>("All")
    const [checkedRowsId, setCheckedRowsId] = useState<string>("")
    const [isModalBtnVisible, setIsModalBtnVisible] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const hendleCreateModal = (bool: boolean) => {
        setIsCreateModalOpen(!bool)
    }
    useEffect(() => {
        let filtered = users
        if (selectedOption !== "All") {
            filtered = filtered.filter((user) => user.userType === selectedOption);
            serOriginalUsers(filtered);
        } else {
            serOriginalUsers(users)
        }
    }, [selectedOption])

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: "Name",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'name',
            minWidth: 80,
            maxWidth: 110,
        },
        {
            key: 'column2',
            name: "Surname",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'surname',
            minWidth: 80,
            maxWidth: 120,
        },
        {
            key: 'column3',
            name: "Role",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'userType',
            minWidth: 80,
            maxWidth: 120
        },
        {
            key: 'column4',
            name: "CreatedDate",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'createdDate',
            minWidth: 80,
            maxWidth: 120
        },
        {
            key: 'column5',
            name: "City",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'city',
            minWidth: 50,
            maxWidth: 120
        },
        {
            key: 'column6',
            name: "Address",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            fieldName: 'address',
            minWidth: 50,
            maxWidth: 120
        }, {
            key: 'column7',
            name: "",
            className: classNames.fileIconCell,
            styles: {
                root: {
                    span: {
                        fontSize: '1.2rem',
                    }
                },
            },
            onRender: (item: User) => renderCheckbox(item),
            fieldName: '',
            minWidth: 20,
            maxWidth: 30
        }
    ]
    //checkbox
    const onChange = (itemId: string) => {
        itemId === checkedRowsId ? setCheckedRowsId("") : setCheckedRowsId(itemId);
    };
    const renderCheckbox = (item: User) => {
        const isDisabled = checkedRowsId !== undefined && checkedRowsId !== item.id;
        return (
            <Checkbox
                disabled={isDisabled}
                // checked={checkedRowsId === item.id}
                onChange={() => onChange(item.id)}
            />
        );
    };
    const hendleEditModal = (bool: boolean) => {
        setIsEditModalOpen(!bool)
    }

    const searchF = () => {
        let filtered = originalUsers;
        if (searchValue.trim() !== "") {
            filtered = filtered.filter((user) =>
                user.userType === selectedOption || selectedOption === "All" &&
                user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            serOriginalUsers(filtered)
        } else {
            serOriginalUsers(users)
        }
    }

    return (
        <Stack>
            <Stack horizontal>
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
                        onClick={() => searchF()}
                    />
                </Stack>
                <Stack horizontal tokens={containerStackTokens} styles={stackStyles}>
                    {checkedRowsId !== undefined && checkedRowsId.length > 0 &&
                        <PrimaryButton
                            text="Delete"
                            allowDisabledFocus
                            iconProps={deleteIcon}
                            styles={deleteButtonStyles}
                            onClick={() => {
                                setIsModalBtnVisible(true)
                            }}
                        />}
                    {checkedRowsId !== undefined && checkedRowsId.length > 0 &&
                        <PrimaryButton
                            text="EDIT"
                            styles={actionButtonStyle}
                            onClick={() => hendleEditModal(false)}
                            iconProps={editFriendIcon}
                            allowDisabledFocus />
                    }
                    <PrimaryButton
                        text="CREATE USER"
                        onClick={() => hendleCreateModal(false)}
                        iconProps={addFriendIcon}
                        allowDisabledFocus />
                </Stack>
            </Stack>
            {isCreateModalOpen && <CreateUser hendleCreateModal={setIsCreateModalOpen} />}
            {isEditModalOpen && <EditUser editPropsId={checkedRowsId} hendleEditModal={setIsEditModalOpen} />}
            {isModalBtnVisible && <DeleteModalAlert setIsModalBtnVisible={setIsModalBtnVisible} checkedRowsId={checkedRowsId} fetchAllUsers={fetchAllUsers} />}
            <Stack>
                <DetailsList
                    items={originalUsers}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    styles={detailsListStyles}
                />
            </Stack>
        </Stack>
    )
}

export default DetailsListUser;