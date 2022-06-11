import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import SideBar from "../components/HideBar";
import ImageBanner from "../components/ImageBanner";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SideBar">
                <SideBar/>
            </ComponentPreview>
            <ComponentPreview path="/ImageBanner">
                <ImageBanner/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;