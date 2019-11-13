import React from "react";
import styled, { keyframes } from "styled-components";
import { merge, slideInRight,flipInY, fadeOut} from 'react-animations';


const animationStyle = merge(slideInRight, flipInY, fadeOut)
const FlipAnimation = keyframes`${animationStyle}`;
const FlipDiv = styled.div`
  animation: Infinite 5s ${FlipAnimation};
`;


const Animate = (props)=>{
    const {children} = props;
    return(
        <FlipDiv>
        {children}
        </FlipDiv>
    )
}


export default Animate;