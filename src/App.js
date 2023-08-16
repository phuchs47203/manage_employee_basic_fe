import React from 'react';
import './App.css';
import { Header, Navbar } from './components';
import { AddEmployee, EditEmployee, ListEmployee } from './container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className='app'>
                    <Navbar />
                    <Routes>
                        <Route index element={<Header />} />
                        <Route path='/' element={<Header />} > </Route>
                    </Routes>
                    <Routes>
                        <Route index element={<ListEmployee />} />
                        <Route path='/' element={<ListEmployee />}> </Route>
                        <Route path="/employeeList" element={<ListEmployee />} />
                        <Route path="/addEmployee" element={<AddEmployee />} />
                        <Route path="/editEmployee" element={<EditEmployee />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>

    )
}

export default App