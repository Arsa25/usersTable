import { FC,useState } from "react"
import { DetailsList, IColumn, mergeStyleSets, Selection, SelectionMode } from "@fluentui/react";

const classNames = mergeStyleSets({
    fileIconCell: {
        fontSize: '1rem',
    },
    headerClassName: {
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
});

type User = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    createdDate: string;
    city: string;
    address: string;
};
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
        maxWidth: 100,
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
        maxWidth: 100,
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
        maxWidth: 100
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
        maxWidth: 150
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
        maxWidth:120
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
        maxWidth: 220
    },
]
interface UserRenderProps {
    users: User[]
}
const DetailsListUser: FC<UserRenderProps> = ({ users }) => {
    const [selectedItem, setSelectedItem] = useState<User | undefined>(undefined)

    const selection: Selection = new Selection({
        onSelectionChanged: () => {
            setSelectedItem(selection.getSelection()[0] as User);
        }
    })
    console.log(selectedItem);
    
    return (
        <div >
            <DetailsList
                items={users}
                columns={columns}
                selection={selection}
                selectionMode={SelectionMode.multiple} 
            />
        </div>
    )
}
export default DetailsListUser;


// const onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn) => {
//     const newColumns: IColumn[] = columns.slice();
//     const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
//     newColumns.forEach((newCol: IColumn) => {
//         if (newCol === currColumn) {
//             currColumn.isSortedDescending = !currColumn.isSortedDescending;
//             currColumn.isSorted = true;
//             this.setState({
//                 announcedMessage: `${currColumn.name} is sorted ${currColumn.isSortedDescending ? 'descending' : 'ascending'
//                     }`,
//             });
//         } else {
//             newCol.isSorted = false;
//             newCol.isSortedDescending = true;
//         }
//     });
//     const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
//     this.setState({
//         columns: newColumns,
//         items: newItems,
//     });
// };