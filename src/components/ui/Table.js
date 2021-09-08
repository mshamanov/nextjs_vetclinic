import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ActionButton from "./ActionButton";
import classes from "./Table.module.css";

const DESC = "descending";
const ASC = "ascending";

const Table = ({contents: {headers, records}, onView, onDelete, showActions = true, showSorting = true}) => {
    const [sortBy, setSortBy] = useState({...headers.find((header) => header.name !== "id"), order: ASC});

    const sortedRecords = sortBy ? records.sort((record1, record2) => {
        let val1 = record1[sortBy.fieldName];
        let val2 = record2[sortBy.fieldName];

        if (Array.isArray(val1) && Array.isArray(val2)) {
            val1 = val1.join();
            val2 = val2.join();
        }

        if (sortBy.order === ASC) {
            return val1 > val2 ? 1 : val1 < val2 ? -1 : 0;
        } else {
            return val1 > val2 ? -1 : val1 < val2 ? 1 : 0;
        }
    }) : records;

    const sortHandler = (header) => {
        setSortBy(prevState => {
            if (prevState === null || prevState.fieldName !== header.fieldName) {
                return {
                    ...header,
                    order: ASC
                };
            } else {
                return {
                    ...prevState,
                    order: prevState.order === DESC ? ASC : DESC
                }
            }
        })
    }

    return <table className={classes.table}>
        <thead>
        <tr>
            {headers
                .filter(header => header.name !== "id")
                .map((header) => <th key={header.fieldName}>
                    <p>{header.name}</p>
                    {showSorting &&
                    <span className={classes["sort-by"]} onClick={() => sortHandler(header)}>
                        <FontAwesomeIcon
                            icon={["fas", `sort${sortBy && header.fieldName === sortBy.fieldName ? (sortBy.order === ASC ? "-up" : "-down") : ""}`]}
                            size="sm" /></span>}
                </th>)}

            {showActions &&
            <th className={classes["actions-col"]}>
                <p>Actions</p>
            </th>}
        </tr>
        </thead>
        <tbody>
        {
            sortedRecords.map((record) => {
                const id = headers.find(header => header.name === "id").fieldName;
                return <tr key={record[id]}>
                    {
                        headers
                            .filter(header => header.name !== "id")
                            .map((header, idx) => {
                                const value = header.mapFn ? header.mapFn(record[header.fieldName]) : record[header.fieldName];
                                return <td key={`${record[id]}-data-${idx}`}>{value}</td>
                            })
                    }
                    {showActions &&
                    <td>
                        <div className={classes["actions-wrapper"]}>
                            <ActionButton small onClick={() => onView(record.id)}>View</ActionButton>
                            <ActionButton small danger onClick={() => onDelete(record.id)}>Delete</ActionButton>
                        </div>
                    </td>}
                </tr>
            })
        }
        </tbody>
    </table>
}

export default Table;