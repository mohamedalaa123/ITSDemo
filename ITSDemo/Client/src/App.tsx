import './App.css';
import React, { Component, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

const List = React.lazy(() => import('./Components/List'));

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Suspense fallback={''}>

            <Routes>
              <Route path="/" element={<List />} />
            </Routes>

          </Suspense>


        </div>

      </div>
    )
  }
}