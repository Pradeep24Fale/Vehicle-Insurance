import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export interface CreditCardType {accountNumber: string | number, creditCardNumber:  string | number, cvv:  string | number}

type Props = {
    creditCardInfo: CreditCardType;
    setCreditCardInfo: (creditCardInfo: CreditCardType) => void;
}

export default function CreditCardInfo(props: Props) {
    const classes = useStyles();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        props.setCreditCardInfo({...props.creditCardInfo, [id]: value});
    }


    return (

            <Grid container spacing={3} style={{margin : '10px'}}>
                <form noValidate autoComplete="off">
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="accountNumber"
                            label="Account Number"
                            value={props.creditCardInfo.accountNumber}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="creditCardNumber"
                            label="Credit Card Number"
                            value={props.creditCardInfo.creditCardNumber}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            error={false}
                            id="cvv"
                            type="number"
                            label="CVV"
                            value={props.creditCardInfo.cvv}
                            onChange={handleOnChange}
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                </form>
            </Grid>
    );
}
