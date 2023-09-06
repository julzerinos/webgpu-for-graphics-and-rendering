import { createCanvas, createWorksheetSection, instantiateApp } from "./libs/web"

import "./style.css"
import { worksheet1 } from "./worksheets/graphics/01-graphics-pipeline"

const app = instantiateApp()

const worksheetDiv = createWorksheetSection(worksheet1)

app.innerHTML = `
  <div>
  ${worksheetDiv.outerHTML}
  </div>
`

for (const [i, t] of worksheet1.tasks.entries()) t.task(t.canvasId, t.interactables)
