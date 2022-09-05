import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardMedia } from "@material-ui/core";
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: '80%',
    },
});

export interface InsuranceProductProps {
    productId: number;
    productName: string;
    productDetails: string;
    productImgName: string;
}

export default function InsuranceProduct(props: InsuranceProductProps) {
    const classes = useStyles();
    const navigate = useNavigate()

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => {navigate(`/products/${props.productId}`)}}>
                <CardMedia
                    className={classes.media}
                    image={`/Images/${props.productName}.png`}
                    title={props.productName}
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.productDetails}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary" onClick={() => {navigate(`/products/${props.productId}`)}}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
