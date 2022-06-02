import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestComponent from "./TestComponent";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>

        <QueryClientProvider client={queryClient}>
          <TestComponent/>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
