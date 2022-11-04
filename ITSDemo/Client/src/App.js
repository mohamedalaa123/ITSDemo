var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import './App.css';
import React, { Component, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
var List = React.lazy(function () { return import('./Components/List'); });
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (<div>
        <div>
          <Suspense fallback={''}>

            <Routes>
              <Route path="/" element={<List />}/>
            </Routes>

          </Suspense>


        </div>

      </div>);
    };
    return App;
}(Component));
export default App;
