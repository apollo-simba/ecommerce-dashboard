
import React, { FC } from "react";

import MainContent from "../components/MainContent";
import ContactHistory from "../components/ContactHistory";
const Home: FC = () => {
    return (
        <div id="content">
            <MainContent />
            <ContactHistory />
        </div>
    );
};

export default Home;