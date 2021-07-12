import React from 'react';


import img1 from './assets/imgNueva.png';
import img2 from './assets/newImgTown.jpg';
import img3 from './assets/imgLaw.jpg';

import { Slider } from './components/slider/Slider';

export const SliderApp = () => {
    return (
        <main>
            <h1>Slider App</h1>
            <Slider
                controlers={ true }
                autoplay={ false }
                velocidad=""
                interval=""
            >
                <div className="slide">
                    <img 
                        src={ img1 } 
                        alt="" 
                        className="test-img"
                    />
                    <div className="slide__text-slide">
                        <p>Imagen uno</p>
                    </div>
                </div>
                <div className="slide">
                    <img 
                        src={ img2 } 
                        alt="" 
                        className="test-img"
                    />
                    <div className="slide__text-slide">
                        <p>Imagen dos</p>
                    </div>
                </div>
                <div className="slide">
                    <img 
                        src={ img3 }   
                        alt="" 
                        className="test-img"
                    />
                    <div className="slide__text-slide">
                        <p>Imagen tres</p>
                    </div>
                </div>
            </Slider>
        </main>
    )
}
