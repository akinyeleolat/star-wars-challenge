import React from "react";
import styled, { keyframes } from "styled-components";

import { flipInY} from 'react-animations';
const FlipAnimation = keyframes`${flipInY}`;
const FlipDiv = styled.div`
  animation: 5s ${FlipAnimation};
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