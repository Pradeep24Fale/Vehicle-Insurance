import React from "react";
import { Route, Routes } from "react-router-dom";
import InsuranceProducts from "./components/insuranceProducts";
import Policies from "./components/policies";
import Payment from "components/payment";


const AppRouter: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<InsuranceProducts/>}/>
                <Route path="/products/:id" element={<Policies/>}/>
                <Route path="/payment/:id" element={<Payment/>}/>
            </Routes>
    );
}
export default AppRouter;
