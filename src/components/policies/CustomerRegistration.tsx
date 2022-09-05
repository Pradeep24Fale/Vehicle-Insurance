import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import axios, { AxiosError } from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paperRoot : {
            flexGrow : 1,
            margin : 5
        },
        textField : {
            margin : theme.spacing(3),
            width : 300,
        },
        button : {
            margin : theme.spacing(3),
            width : 100,
        },
    }),
);

export interface CustomerType {customerId: string | number, customerName: string, birthDate: string, customerEmail: string, phoneNumber: string}

type Props = {
    setCustomer: (customer: CustomerType) => void;
}

type Data = {
    httpStatus: string;
    data?: CustomerType
}

export default function CustomerRegistration(props: Props) {
    const [customer, setCustomer] = useState<CustomerType>({customerId: '', customerName: '', birthDate: '', customerEmail: '', phoneNumber: ''});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const classes = useStyles();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setCustomer({...customer, [id]: value});
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(customer.customerEmail!== '' && customer.customerName !== '' && customer.phoneNumber !== '' && customer.birthDate !== '') {
            const baseUrl = "http://localhost:8091"
            axios.post<Data>( `${baseUrl}/add-customer`, {
                ...customer
            } ).then( (res) => {
                if (res && res.data && res.data.httpStatus === 'OK') {
                    props.setCustomer( res.data.data );
                    setSuccessMessage("Successfully registered")
                } else {
                    throw new Error( 'There is error in response' );
                }
            } ).catch( (ex: AxiosError) => {
                const errorData = ex.response?.data as Error;
                setErrorMessage( errorData.message );
            } )
        }

    }

    return (
        <Paper elevation={3} className={classes.paperRoot}>
            {errorMessage !== '' && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>}

            {successMessage !== '' && <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {successMessage}
            </Alert>}

            <Grid container spacing={3} style={{margin : '10px'}}>
                <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="customerName"
                            label="Customer Name"
                            value={customer.customerName}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            id="birthDate"
                            label="Birthday"
                            type="date"
                            value={customer.birthDate}
                            onChange={handleOnChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink : true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="phoneNumber"
                            type="number"
                            label="Phone number"
                            value={customer.phoneNumber}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="customerEmail"
                            label="Email Address"
                            value={customer.customerEmail}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
}
