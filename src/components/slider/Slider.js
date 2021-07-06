import React, { useEffect, useRef } from 'react';

import img1 from '../../assets/imgNueva.png';
import img2 from '../../assets/newImgTown.jpg';
import img3 from '../../assets/imgLaw.jpg';
import { ReactComponent as ArrowLeft } from '../../assets/LeftArrow.svg';
import { ReactComponent as ArrowRight } from '../../assets/RightArrow.svg';



export const Slider = () => {

    const intervalRef = useRef(null);
    const slideContainerRef = useRef( null );

    useEffect(() => {
        
        intervalRef.current = setInterval(() => {
            HandleNextImg();
        }, 5000);


        slideContainerRef.current.addEventListener( 'mouseenter', () =>{
            clearInterval( intervalRef.current );
        });

        slideContainerRef.current.addEventListener( 'mouseleave', () =>{
            intervalRef.current = setInterval(() => {
                HandleNextImg();
            }, 5000);
        });

    }, [])

    const HandleNextImg = () => {
        const slideContainer = slideContainerRef.current;
        //make sure that the component has childrens
        if ( slideContainer.children.length > 0 ) {
            // Get the fist slisdecontainers element
            const firstElement = slideContainer.children[0];
            slideContainer.style.transition = `.500s ease-out all`;

            const widthSlide = slideContainer.children[0].offsetWidth;
            slideContainer.style.transform = `translateX( -${ widthSlide }px ) `;
            
            const transition = () => {
                slideContainer.style.transition = 'none';
                slideContainer.style.transform = 'translateX(0)';
                slideContainer.appendChild( firstElement );
                slideContainer.removeEventListener( 'transitionend', transition );
            }

            slideContainer.addEventListener( 'transitionend', transition );
        }
    } 
    const HandlePreviusImg = () => {
        const slideContainer = slideContainerRef.current;

        if ( slideContainer.children.length > 0 ) {
            const lastElement = slideContainer.children[ slideContainer.children.length - 1 ];
            slideContainer.insertBefore( lastElement, slideContainer.firstChild );

            const widthSlide = slideContainer.children[0].offsetWidth;
            slideContainer.style.transition = 'none';
            slideContainer.style.transform = `translateX( -${ widthSlide }px ) `;

            setTimeout(() => {
                slideContainer.style.transition = `.300s ease-out all`;
                slideContainer.style.transform = `translateX( 0 ) `;    
            }, 30);
        }
    } 

    return (
        <div className="main-container">
            <div 
                className="slide-container"
                ref={ slideContainerRef }
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
                    <img src={ img3 } alt="" className="test-img"/>
                    <div className="slide__text-slide">
                        <p>Imagen tres</p>
                    </div>
                </div>
            </div>
            <div className="buttons__buttons-controls">
                <button
                    className="buttons__button LeftArrow"
                    onClick={ HandlePreviusImg }
                >
                    <ArrowLeft />
                </button>
                <button
                    className="buttons__button RightArrow"
                    onClick={ HandleNextImg }
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}
