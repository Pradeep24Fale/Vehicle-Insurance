import React, { useState } from "react";
import { createStyles , makeStyles , Theme } from "@material-ui/core/styles";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLocation } from "react-router-dom";
import { PolicyType } from "components/policies/PoliciesTable";
import { CustomerType } from "components/policies/CustomerRegistration";
import Button from "@material-ui/core/Button";
import CreditCardInfo, { CreditCardType } from "components/payment/CreditCardInfo";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios, { AxiosError } from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

type StateType = {
    customer?: CustomerType,
    policies?: Array<PolicyType>
}

type Data = {
    httpStatus: string;
    data: string
}

const Payment: React.FC = () => {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [creditCardInfo, setCreditCardInfo] = useState<CreditCardType>({accountNumber: '', creditCardNumber: '', cvv: ''});
    const location = useLocation();
    const stateValue: StateType = location.state;
    const {customer, policies} = stateValue;

    let totalPremium = 0;
    policies.forEach((policy) => {
        totalPremium = totalPremium + policy.premium;
    });

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(customer, policies, event);
        if(customer.customerId!== '' && policies.length > 0 && creditCardInfo.creditCardNumber !== '' || creditCardInfo.accountNumber !== '' || creditCardInfo.cvv !== '') {
            const baseUrl = "http://localhost:8091"
            axios.post<Data>( `${baseUrl}/payment`, {
                ...creditCardInfo,
                customerId: customer.customerId,
                policyList: policies.map((policy) => policy.policyId),
                cvv: parseInt(creditCardInfo.cvv.toString(), 10)
            } ).then( (res) => {
                if (res && res.data && res.data.httpStatus === 'OK') {
                    setSuccessMessage(res.data.data)
                } else {
                    throw new Error( 'There is error in response' );
                }
            } ).catch( (ex: AxiosError) => {
                const errorData = ex.response?.data as Error;
                setErrorMessage( errorData.message );
            } )
        }
    }



    return <Box>
        {errorMessage !== '' && <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
        </Alert>}

        {successMessage !== '' && <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {successMessage}
        </Alert>}
        <Typography variant="h6">Payment</Typography>
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.demo} m={1}>
                <Typography variant="subtitle1">{`Thank you ${customer?.customerName} san for selecting below policies`}</Typography>
                <List>
                    {policies.map((policy)=>(
                        <ListItem key={policy.policyId}>
                            <ListItemAvatar>

                                    <ArrowRightIcon />
                            </ListItemAvatar>
                            <ListItemText
                                primary={policy.policyName}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box m={1}>
            <Typography variant="subtitle1">{`Total Premium: ${totalPremium}`}</Typography>
            </Box>
            <Box m={1}>
                <Typography variant="h6">Credit Card Info</Typography>
                <CreditCardInfo creditCardInfo={creditCardInfo} setCreditCardInfo={setCreditCardInfo}/>
            </Box>
            <Box
                m={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOnClick}
                    disabled={creditCardInfo.creditCardNumber === '' || creditCardInfo.accountNumber === '' || creditCardInfo.cvv === ''}

                >
                    Pay
                </Button>
            </Box>
        </Paper>
    </Box>;
};

export default Payment;