import React from "react";
import styled, { keyframes } from "styled-components";
import { merge, slideInRight,flipInY } from 'react-animations';


const animationStyle = merge(slideInRight, flipInY)
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