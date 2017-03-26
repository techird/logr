///<reference types="webpack-env" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import Counter from "./components";
import "./index.less";
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const root = document.getElementById('root');
ReactDOM.render(
    <AppContainer>
        <Counter />
    </AppContainer>, 
    root
);

if (module.hot) {
    module.hot.accept('./components', () => {
        const NewCounter = require<any>("./components").default;
        ReactDOM.render(
            <AppContainer>
                <NewCounter />
            </AppContainer>, 
            root
        );
    });
}
