import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import SideBar from "../HideBar";
import AppImageBanner from "../AppImageBanner";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SideBar">
                <SideBar/>
            </ComponentPreview>
            <ComponentPreview path="/AppImageBanner">
                <AppImageBanner/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;