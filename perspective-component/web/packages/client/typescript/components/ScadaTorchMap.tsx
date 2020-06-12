/**
 * Example of a component which displays an image, given a URL.
 */

import * as React from 'react';
import { Component, ComponentMeta, ComponentProps, SizeObject } from '@inductiveautomation/perspective-client';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import SimpleExample from './LeafletExampleMap';

// the 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
export const COMPONENT_TYPE = "rad.display.image";


// this is the shape of the properties we get from the perspective 'props' property tree.
export interface ImageProps {
    url: string;   // the url of the image this component should display
}

function useLeaflet() {
  useEffect(() => {
    const cssTag = document.createElement('link');
    cssTag.rel = 'stylesheet';
    cssTag.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';
    cssTag.integrity = 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=='
    cssTag.crossOrigin = ''

    const scriptTag = document.createElement('script');
    scriptTag.async = false;
    scriptTag.src = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js';
    scriptTag.integrity = 'sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=='
    scriptTag.crossOrigin = ''

    document.body.appendChild(cssTag);
    document.body.appendChild(scriptTag);

    return () => {
        document.body.removeChild(cssTag)
        document.body.removeChild(scriptTag)
    }
  })
}
const LeafletTags = React.memo(() => {
    useLeaflet()
    return <></>
})

@observer
export class ScadaTorchMap extends Component<ComponentProps, any> {
    render() {
        const { props } = this.props;
        // // read the 'url' property provided by the perspective gateway via the component 'props'.
        // const propUrl: string = props.read('url');

        // note that the topmost piece of dom requires the application of events, style and className as shown below
        // otherwise the layout won't work, or any events configured will fail.
        return (
            <div {...this.props.emit()}>
                <LeafletTags />
                <SimpleExample />
            </div>
        );
    }
}


// this is the actual thing that gets registered with the component registry
export class ScadaTorchMapMeta implements ComponentMeta {

    getComponentType(): string {
        return COMPONENT_TYPE;
    }

    // the class or React Type that this component provides
    getViewClass(): React.ReactType {
        return ScadaTorchMap;
    }

    getDefaultSize(): SizeObject {
        return ({
            width: 600,
            height: 400
        });
    }
}
