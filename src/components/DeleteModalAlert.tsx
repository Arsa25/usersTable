import {FC} from 'react'
interface IDeleteModalAlertProps {
    checkedRowsId: string | undefined;
    setIsModalBtnVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModalAlert: FC<IDeleteModalAlertProps> = ({checkedRowsId,setIsModalBtnVisible}) => {

    //delete
    const deleteUsers = (arrId: string) => {
        fetch(`http://localhost:3000/persons/${arrId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        window.location.reload()
    }

    return (
        <div className="modalDelete">
            <h2>Da li ste sigurni?</h2>
            <span>
                <button onClick={() => {
                    checkedRowsId && deleteUsers(checkedRowsId)
                    setIsModalBtnVisible(false)
                }} className="btn">Yes</button>
                <button onClick={() => setIsModalBtnVisible(false)} className="btn">No</button>
            </span>
        </div>
    )
}
export default DeleteModalAlert;