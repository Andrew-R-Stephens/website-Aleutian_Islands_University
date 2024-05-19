import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import SideBar from "../components/shared/HideBar";
import ImageBanner from "../components/shared/ImageBanner";
import SideBanner from "../components/shared/SideBanner";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SideBar">
                <SideBar/>
            </ComponentPreview>
            <ComponentPreview path="/ImageBanner">
                <ImageBanner/>
            </ComponentPreview>
            <ComponentPreview path="/SideBanner">
                <SideBanner/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;