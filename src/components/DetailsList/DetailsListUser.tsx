import { FC, useState } from "react"
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
    ActionButton,
} from "@fluentui/react";
import EditUser from "../EditUser";

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

const addFriendIcon: IIconProps = { iconName: "Edit" };

const actionButtonStyle = {
    root: {
        height: "32px",
        marginLeft: "10px"
    }
}

//delete
const deleteButtonStyles: Partial<IButtonStyles> = {
    root: {
        fontSize: "1.1rem",
        border: "none"
    },
}
const deleteIcon: IIconProps = { iconName: "delete" };
type User = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
};
interface UserRenderProps {
    users: User[]
}



const DetailsListUser: FC<UserRenderProps> = ({ users }) => {
    const [checkedRowsId, setCheckedRowsId] = useState<string | undefined>(undefined);
    const [isModalBtnVisible, setIsModalBtnVisible] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const columns: IColumn[] = [
        {
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
        },
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
            maxWidth: 120,
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
        }
    ]
    //checkbox
    const onChange = (itemId: string) => {
        itemId === checkedRowsId ? setCheckedRowsId(undefined) : setCheckedRowsId(itemId);
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
    //delete
    const deleteUsers = (arrId: string) => {
        fetch(`http://localhost:3000/persons/${arrId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                alert('Korisni je uspešno obrisan.');
            } else {
                alert('Došlo je do greške prilikom brisanja korisnika.');
            }
        }).catch(error => {
            console.error('Došlo je do greške prilikom slanja zahteva:', error);
            alert('Došlo je do greške prilikom slanja zahteva za brisanje korisnika.');
        });
        window.location.reload()
    }


return (
    <Stack>
        <div>
            {isModalBtnVisible &&
                <div className="modalDelete">
                    <h2>Da li ste sigurni?</h2>
                    <span>
                        <button onClick={() => {
                            checkedRowsId && deleteUsers(checkedRowsId)
                            setIsModalBtnVisible(false)
                        }} className="btn">Yes</button>
                        <button onClick={() => setIsModalBtnVisible(false)} className="btn">No</button>
                    </span>
                </div>}
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
            {
                checkedRowsId !== undefined && checkedRowsId.length > 0 &&
                <ActionButton
                    text="Edit"
                    styles={actionButtonStyle}
                    onClick={() => hendleEditModal(false)}
                    iconProps={addFriendIcon}
                    allowDisabledFocus />
            }
            {
                isEditModalOpen && <EditUser editPropsId={checkedRowsId} hendleEditModal={setIsEditModalOpen} />
            }
        </div>
        <div>
            <DetailsList
                items={users}
                columns={columns}
                selectionMode={SelectionMode.none}
                styles={detailsListStyles}
            />
        </div>
    </Stack>
)
}

export default DetailsListUser;