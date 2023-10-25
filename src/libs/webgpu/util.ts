import { mat4 } from "../util/matrix"

export const toNDC = mat4(
    1.0,
    0.0,
    0.0,
    0.0,
    
    0.0,
    1.0,
    0.0,
    0.0,
    
    0.0,
    0.0,
    -0.5,
    0.5,
    
    0.0,
    0.0,
    0.0,
    1.0
)
