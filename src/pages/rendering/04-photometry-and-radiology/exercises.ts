import { ViewGenerator } from "../../../types"

import { asset, createText, createTitle } from "../../../libs/web"

const view: ViewGenerator = (div: HTMLElement) => {
    const title = createTitle("Measuring light")
    const description = createText(`
Radiometry and photometry are two schools of light measurement. While radiometry is more aligned with machine-friendly value, photometry addresses the measurements in a human-friendly (readable) method.
In the end, both are measurements of the same phenomena and there exists a direct conversion between the two sets of units.

Below are seven examples of light measurement exercises which make use of the equations. 
They are meant to provide a more practical look into the behaviour of light and how that could apply to the art of rendering.
A key take-away is about the radial flux of light - how light radiates spherically outwards (from isotropic and/or homogeneous light sources) and a object surface a certain distance away will receive a slice of that enlarging sphere.

Mathematically this would require integrals (as in the examples below) to calculate the amount of light, but as weill be later shown, this can be approximated with Monte Carlo integration in progressive rendering.
`)

    const iframe = document.createElement("iframe")
    iframe.width = "100%"
    iframe.height = "1000px"
    iframe.src = asset("webgpu-for-graphics-and-rendering/resources/worksheet.pdf")

    div.append(title, description, iframe)
}

export default view
