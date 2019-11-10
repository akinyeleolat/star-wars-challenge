import React from "react";
import styled, { keyframes } from "styled-components";

import { merge, slideInRight, bounce } from 'react-animations';


const animationStyle = merge(slideInRight, bounce)
const FlipAnimation = keyframes`${animationStyle}`;
const FlipDiv = styled.div`
  animation: Infinite 20s ${FlipAnimation};
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