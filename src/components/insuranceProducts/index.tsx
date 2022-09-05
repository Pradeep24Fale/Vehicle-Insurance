import React, { useEffect, useState } from "react";
import { createStyles , makeStyles , Theme } from "@material-ui/core/styles";
import {  Grid, Paper } from "@material-ui/core";
import InsuranceProduct , { InsuranceProductProps } from "./InsuranceProduct";
import Typography from "@material-ui/core/Typography";
import axios, {AxiosError} from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root : {
            flexGrow : 1 ,
            margin: 5
        } ,
        paper : {
            padding : theme.spacing(2) ,
            textAlign : 'center' ,
            color : theme.palette.text.secondary ,
        } ,
    }) ,
);

type Data = {
    httpStatus: string;
    data?: Array<InsuranceProductProps>
}


const InsuranceProducts: React.FC = () => {
    const [insuranceProducts, setInsuranceProducts] = useState<Array<InsuranceProductProps>>([]);
    const [errorMessage, setErrorMessage] = useState('')
    const classes = useStyles();
    const baseUrl = "http://localhost:8091"
    useEffect(() => {
        axios.get<Data>(`${baseUrl}/insurance-products`).then((res) => {
            if(res && res.data && res.data.httpStatus === 'OK') {
                setInsuranceProducts(res.data.data)
            }
        }).catch((ex: AxiosError) => {
            const errorData = ex.response?.data as Error;
            setErrorMessage(errorData.message);
        })
    }, []);

    return <div>
        {errorMessage !== '' && <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
        </Alert>}
        <Typography variant="h6">Insurance Products</Typography>
        <Paper elevation={3} className={classes.root}>
        <Grid container spacing={3} style={{margin: '10px'}}>
            {insuranceProducts.map((product) => (
                <Grid key={product.productName} item xs={12} sm={6}>
                    <InsuranceProduct
                        productId={product.productId}
                        productName={product.productName}
                        productDetails={product.productDetails}
                        productImgName={product.productName}/>

                </Grid>
            ))}
        </Grid>
        </Paper>
    </div>;
};

export default InsuranceProducts;