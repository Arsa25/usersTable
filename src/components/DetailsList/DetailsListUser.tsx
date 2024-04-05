import { FC, useState} from "react"
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
//styles
//searchBox
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
    filteredUsers: User[]
    fetchAllUsers: () => void
}
const DetailsListUser: FC<UserRenderProps> = ({fetchAllUsers, filteredUsers}) => {
    const [checkedRowsId, setCheckedRowsId] = useState<string>("")

    const [isModalBtnVisible, setIsModalBtnVisible] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
        const isDisabled = checkedRowsId !== "" && checkedRowsId !== item.id;
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
    return (
        <Stack>
            //buttons
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
                    onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
                    iconProps={addFriendIcon}
                    allowDisabledFocus />
            </Stack>

            //modals
            {isCreateModalOpen && <CreateUser hendleCreateModal={setIsCreateModalOpen} />}
            {(checkedRowsId && isEditModalOpen) && <EditUser editPropsId={checkedRowsId} hendleEditModal={setIsEditModalOpen} />}
            {(checkedRowsId && isModalBtnVisible) && <DeleteModalAlert setIsModalBtnVisible={setIsModalBtnVisible} checkedRowsId={checkedRowsId} fetchAllUsers={fetchAllUsers} />}

            //detailsList
            <Stack>
                <DetailsList
                    items={filteredUsers}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    styles={detailsListStyles}
                />
            </Stack>
        </Stack>
    )
}
export default DetailsListUser;