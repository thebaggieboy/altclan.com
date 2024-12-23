import React from "react";
import styles from ".//Address.module.css"

/* eslint-disable react/no-deprecated */
const { useState } = React;

const Address = () => {
    const [rows, setRows] = useState([
        { name: 'Babajide Ahmed', address: '17b Lateef Jakande Street , Lekki. Lagos', phone: '08012345678', editing: false },
        { name: 'John Doe', address: '15 Sunmola Taofik Street , Ikeja. Lagos', phone: '08012345679', editing: false },
        { name: 'John Doe', address: '9a Emmanuel Ibe Street , Yaba. Lagos', phone: '08012345688', editing: false },
        { name: 'John Doe', address: '15 Redeem Street, Magodo. Lagos', phone: '08012345778', editing: false },
        { name: 'Elizabeth Micheal', address: '1 Ajao Estate Road, Lekki. Lagos', phone: '08012346678', editing: false },
        { name: 'Daniel Fadeyi', address: '2 Musa Street, Life Camp. Abuja', phone: '08012355678', editing: false },
        { name: 'Olivia Ikechukwu', address: 'Aro psychiatric hospital. Ogun State', phone: '08012445678', editing: false }
    ]);

    const editRow = (row: { name: string; address: string; phone: string; editing: boolean; }) => {
        const updatedRows = rows.map((r) => {
            if (r === row) {
                return { ...r, editing: true };
            }
            return r;
        });
        setRows(updatedRows);
    };

    const saveRow = (row: { name: string; address: string; phone: string; editing: boolean; }) => {
        const updatedRows = rows.map((r) => {
            if (r === row) {
                return { ...r, editing: false };
            }
            return r;
        });
        setRows(updatedRows);
    };

    const deleteRow = (index: number) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const addRow = () => {
        const newRows = [...rows, { name: '', address: '', phone: '', editing: true }];
        setRows(newRows);
    };

    return (
        <>
            <div className={styles.container}>
                <div>
                    {rows.map((row, index) => (
                        <div key={index} className={styles.Card}>
                            {!row.editing && <div className={styles.name}>{row.name}</div>}
                            {!row.editing && <div className={styles.address}>{row.address}</div>}
                            {!row.editing && <div className={styles.phone}>{row.phone}</div>}
                            {row.editing && <div><input type="text" value={row.name} onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].name = e.target.value;
                                setRows(updatedRows);
                            }} /></div>}
                            {row.editing && <div><input type="text" value={row.address} onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].address = e.target.value;
                                setRows(updatedRows);
                            }} /></div>}
                            {row.editing && <div><input type="text" value={row.phone} onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].phone = e.target.value;
                                setRows(updatedRows);
                            }} /></div>}
                            <div>
                                {!row.editing && <button className={styles.editbutton} onClick={() => editRow(row)}>Edit</button>}
                                {row.editing && <button className={styles.savebutton} onClick={() => saveRow(row)}>Save</button>}
                                <button className={styles.deletebutton} onClick={() => deleteRow(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className={styles.addbutton} onClick={addRow}>New Address</button>
        </>
    );
}

export default Address;