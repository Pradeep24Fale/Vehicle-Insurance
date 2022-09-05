import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableBody: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    }
});


export interface PolicyType {policyId: string, policyName: string, policyDetails: string, premium: number  }

type Props = {
    setPolicies: (policies:Array<PolicyType>) => void;
}

type Data = {
    httpStatus: string;
    data?: Array<PolicyType>
}



export default function PoliciesTable(props: Props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const {id} = useParams();
    const [checked, setChecked] = useState([]);

    const baseUrl = "http://localhost:8091"
    useEffect(() => {
        axios.get<Data>(`${baseUrl}/insurance-products/${id}`).then((res) => {
            if(res && res.data && res.data.httpStatus === 'OK') {
                setRows(res.data.data)
            }else {
                throw new Error('There is error in response');
            }
        }).catch((ex: AxiosError) => {
            const errorData = ex.response?.data as Error;
            setErrorMessage(errorData.message);
        })
    }, [id]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, policy: PolicyType) => {
        const {checked: checkBoxChecked} = event.target;
        const tempChecked = [...checked];
        if(checkBoxChecked && !checked.includes(policy.policyId)) {
            tempChecked.push(policy.policyId)
        } else {
            const index = checked.indexOf(policy.policyId);
            if (index !== -1) {
                tempChecked.splice(index , 1);
            }
        }
        setChecked(tempChecked);

        const policies = []
        tempChecked.forEach((policyId) => {
           const policyObj = rows.find((policyItem) => policyItem.policyId === policyId);
           if(policyObj) {
               policies.push(policyObj);
           }
        })
        props.setPolicies(policies);

    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width="10%"></TableCell>
                        <TableCell width="10%" align="left">Policy Id</TableCell>
                        <TableCell width="30%" align="left">Policy Name</TableCell>
                        <TableCell width="40%" align="left">Policy Details</TableCell>
                        <TableCell width="10%" align="left">Premium</TableCell>
                    </TableRow>
                </TableHead>
                {errorMessage !== ''
                    ? <TableBody className={classes.tableBody}>
                        <TableRow>
                            <TableCell colSpan={5} style={{textAlign: 'center'}}>
                                 <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {errorMessage}
                                </Alert>
                        </TableCell>
                        </TableRow>
                </TableBody>
                :<TableBody className={classes.tableBody}>
                    {rows.map((row) => (
                        <TableRow key={row.policyId}>
                            <TableCell width="10%" component="th" scope="row">
                                <Checkbox
                                    checked={checked.includes(row.policyId)}
                                    onChange={(e) => handleChange(e, row)}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </TableCell>
                            <TableCell width="10%" align="left">{row.policyId}</TableCell>
                            <TableCell width="30%" align="left">{row.policyName}</TableCell>
                            <TableCell width="40%" align="left">{row.policyDetails}</TableCell>
                            <TableCell width="10%" align="left">{row.premium}</TableCell>
                        </TableRow>
                    ))}
                </TableBody> }
            </Table>
        </TableContainer>
    );
}
