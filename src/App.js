import React from 'react';
import './App.css';
import { Header, Navbar } from './components';
import { AddEmployee, EditEmployee, ListEmployee } from './container';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/reduxApp/store';

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Provider store={store}>
                    <div className='app'>
                        <Navbar />
                        {/* <Routes>
                            <Route index element={<Header />} />
                            <Route path='/' element={<Header />} > </Route>
                        </Routes> */}
                        <Routes>
                            <Route index element={<ListEmployee />} />
                            <Route path='/' element={<ListEmployee />}> </Route>
                            <Route path="/employeeList" element={<ListEmployee />} />
                            <Route path="/addEmployee" element={<AddEmployee />} />

                            <Route path="/editEmployee/:id" element={<EditEmployee />} />
                        </Routes>
                    </div>
                </Provider>
            </BrowserRouter>
        </>

    )
}

export default App