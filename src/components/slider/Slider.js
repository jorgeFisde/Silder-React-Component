import React, { useCallback, useEffect, useRef } from 'react';

import { ReactComponent as ArrowLeft } from '../../assets/LeftArrow.svg';
import { ReactComponent as ArrowRight } from '../../assets/RightArrow.svg';



export const Slider = ({ 
    children,
    controlers = true, 
    autoplay = true, 
    speed = "500",
    interval = 5000 
}) => {

    const intervalRef = useRef(null);
    const slideContainerRef = useRef( null );

    const HandleNextImg = useCallback (() => {


        const slideContainer = slideContainerRef.current;
        //make sure that the component has childrens
        if ( slideContainer.children.length > 0 ) {
            // Get the fist slisdecontainers element
            const firstElement = slideContainer.children[0];
            slideContainer.style.transition = `.${ speed }s ease-out all`;

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
    }, [ speed ])

    const HandlePreviusImg = () => {
        const slideContainer = slideContainerRef.current;

        if ( slideContainer.children.length > 0 ) {
            const lastElement = slideContainer.children[ slideContainer.children.length - 1 ];
            slideContainer.insertBefore( lastElement, slideContainer.firstChild );

            const widthSlide = slideContainer.children[0].offsetWidth;
            slideContainer.style.transition = 'none';
            slideContainer.style.transform = `translateX( -${ widthSlide }px ) `;

            setTimeout(() => {
                slideContainer.style.transition = `.${ speed }s ease-out all`;
                slideContainer.style.transform = `translateX( 0 ) `;    
            }, 30);
        }
    } 

    useEffect(() => {
        if ( autoplay ) {
            intervalRef.current = setInterval(() => {
                HandleNextImg();
            }, interval );
    
    
            slideContainerRef.current.addEventListener( 'mouseenter', () =>{
                clearInterval( intervalRef.current );
            });
    
            slideContainerRef.current.addEventListener( 'mouseleave', () =>{
                intervalRef.current = setInterval(() => {
                    HandleNextImg();
                }, interval );
            });
        }
    }, [ autoplay ,interval, HandleNextImg ]);

    return (
        <div className="main-container">
            <div 
                className="slide-container"
                ref={ slideContainerRef }
            >

                {
                    children
                }

            </div>
            {
                    (
                        controlers && (
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
                        )
                    )
            }
        </div>
    )
}
