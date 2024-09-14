import React from 'react';
import { useSymbol } from './SymbolContext';
// import SymbolSelector from './SymbolSelector';


const Header: React.FC = () => {
    const { setSymbol } = useSymbol();

    return (
        <header>
            <a id="site-logo" href="#">SKXYWTF</a>
            {/* <input type="search" placeholder="Search..." /> */}
            {/* <SymbolSelector /> */}
        </header>
    );
};

export default Header;