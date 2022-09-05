import React from "react";
import PoliciesTable, { PolicyType } from "./PoliciesTable";
import Typography from "@material-ui/core/Typography";
import CustomerRegistration, { CustomerType } from "components/policies/CustomerRegistration";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";



const Policies: React.FC = () => {

    const navigate = useNavigate();

    const [policies, setPolicies] = React.useState<Array<PolicyType>>([]);
    const [customer, setCustomer] = React.useState<CustomerType>( {customerId: '', customerName: '', birthDate: '', customerEmail: '', phoneNumber: ''});

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(customer, policies, event)
        navigate(`/payment/${customer.customerId}`, {replace: true, state: {policies, customer}})
    }

    return <>
        <Typography variant="h6">Policies</Typography>
        <Typography variant="subtitle1">Please select policies which you want to buy</Typography>
        <PoliciesTable setPolicies={setPolicies}/>
        <Box mt={1} mb={2}>
        <Typography variant="h6">Customer Registration</Typography>
            <Typography variant="subtitle1">Please register here to proceed</Typography>
        <CustomerRegistration setCustomer={(cusId) => setCustomer(cusId)}/>
        </Box>
        <Box
            mb={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Button
                variant="contained"
                color="primary"
                onClick={handleOnClick}
                disabled={policies.length === 0 || customer.customerId === ''}
            >
                Next
            </Button>
        </Box>
    </>
};

export default Policies;
