import {
    initializeWebGPU,
    createPass,
    genreateBuffer,
    setupShaderPipeline,
    createBind,
} from "../../../libs/webgpu"

import { Square } from "../../../libs/util/shapes"
import { flatten, vec2, vec3 } from "../../../libs/util/vector"

import shaderBlack from "./shaderBlack.wgsl?raw"
import shaderColor from "./shaderColor.wgsl?raw"
import shaderRotateWithTime from "./shaderRotateWithTime.wgsl?raw"
import shaderDrawCricle from "./shaderDrawCircle.wgsl?raw"
import { IDefineInteractables, ITask, IWorksheet } from "../../../types"

export const task1: ITask = {
    title: "The Three Pixeleers",
    description: "This is a test description",
    canvasId: "task1",
    interactables: {},
    task: async canvasId => {
        const { device, canvas, context, canvasFormat } = await initializeWebGPU(canvasId)

        const { pass, executePass } = createPass(device, context, {
            r: 0.3921,
            g: 0.5843,
            b: 0.9294,
            a: 1.0,
        })

        const squares = ([] as number[]).concat(
            flatten(Square([0, 0], 10 * (2 / canvas.height))),
            flatten(Square([1, 0], 10 * (2 / canvas.height))),
            flatten(Square([1, 1], 10 * (2 / canvas.height)))
        )

        const vertexArray = new Float32Array(squares)
        const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
            device,
            vertexArray,
            "float32x2"
        )

        const pipeline = setupShaderPipeline(
            device,
            [vertexBufferLayout],
            canvasFormat,
            shaderBlack
        )

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.draw(squares.length / 2)

        executePass()
    },
}

export const task2: ITask = {
    title: "It's triangles all the way down",
    description: "",
    canvasId: "task2",
    interactables: {},
    task: async canvasId => {
        const { device, context, canvasFormat } = await initializeWebGPU(canvasId)

        const { pass, executePass } = createPass(device, context, {
            r: 0.3921,
            g: 0.5843,
            b: 0.9294,
            a: 1.0,
        })

        const triangle = [vec2(0, 0), vec2(1, 0), vec2(1, 1)]
        const colors = [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)]

        const vertexArray = new Float32Array(flatten(triangle))
        const colorArray = new Float32Array(flatten(colors))

        const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
            device,
            vertexArray,
            "float32x2"
        )
        const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateBuffer(
            device,
            colorArray,
            "float32x3",
            1
        )

        const pipeline = setupShaderPipeline(
            device,
            [vertexBufferLayout, colorBufferLayout],
            canvasFormat,
            shaderColor
        )

        pass.setPipeline(pipeline)

        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, colorBuffer)
        pass.draw(triangle.length)

        executePass()
    },
}

export const task3: ITask = {
    title: "Spin me right round",
    description: "",
    canvasId: "task3",
    interactables: {},
    task: async canvasId => {
        const { device, context, canvasFormat } = await initializeWebGPU(canvasId)

        const square = Square(vec2(0, 0), 1)
        const vertexArray = new Float32Array(flatten(square))

        const frame = (time: number) => {
            const { pass, executePass } = createPass(device, context, {
                r: 0.3921,
                g: 0.5843,
                b: 0.9294,
                a: 1.0,
            })

            const { bufferLayout: vertexBufferLayout, buffer: vertexBuffer } = genreateBuffer(
                device,
                vertexArray,
                "float32x2"
            )
            const pipeline = setupShaderPipeline(
                device,
                [vertexBufferLayout],
                canvasFormat,
                shaderRotateWithTime
            )

            pass.setPipeline(pipeline)
            pass.setVertexBuffer(0, vertexBuffer)

            const timeArray = new Float32Array([time / 1e3])
            const timeBindGroup = createBind(device, pipeline, timeArray)
            pass.setBindGroup(0, timeBindGroup)

            pass.draw(square.length)
            executePass()

            requestAnimationFrame(frame)
        }

        requestAnimationFrame(frame)
    },
}

export const task4: ITask = {
    title: "Memories from Nokia",
    description: "",
    canvasId: "task4",
    interactables: {
        size: "range",
        height: "range",
        speed: "range",
    },
    task: async canvasId => {
        const { device, context, canvasFormat } = await initializeWebGPU(canvasId)

        const backgroundSquare = Square(vec2(0, 0), 2)
        const vertexArray = new Float32Array(flatten(backgroundSquare))

        let height = 0.2
        let speed = 4
        let size = 1.05

        const heightInput = document.getElementById("height") as HTMLInputElement
        heightInput.value = String(height)
        heightInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement
            height = Number(target.value)
        })

        const speedInput = document.getElementById("speed") as HTMLInputElement
        speedInput.value = String(speed)
        speedInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement
            speed = Number(target.value)
        })

        const sizeInput = document.getElementById("size") as HTMLInputElement
        sizeInput.value = String(size)
        sizeInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement
            size = Number(target.value)
        })

        const frame = (time: number) => {
            const { pass, executePass } = createPass(device, context, {
                r: 0.459,
                g: 0.882,
                b: 0.996,
                a: 1.0,
            })

            const { bufferLayout: vertexBufferLayout, buffer: vertexBuffer } = genreateBuffer(
                device,
                vertexArray,
                "float32x2"
            )
            const pipeline = setupShaderPipeline(
                device,
                [vertexBufferLayout],
                canvasFormat,
                shaderDrawCricle
            )

            pass.setPipeline(pipeline)
            pass.setVertexBuffer(0, vertexBuffer)

            const timeArray = new Float32Array([time / 1e3])
            const timeBindGroup = createBind(device, pipeline, timeArray)
            pass.setBindGroup(0, timeBindGroup)

            const ballArray = new Float32Array([height, speed, size])
            const ballBindGroup = createBind(device, pipeline, ballArray, 1)
            pass.setBindGroup(1, ballBindGroup)

            pass.draw(backgroundSquare.length)
            executePass()

            requestAnimationFrame(frame)
        }

        requestAnimationFrame(frame)
    },
}

export const worksheet1: IWorksheet = {
    title: "A small introduction to WebGPU",
    description: "",
    tasks: [task1, task2, task3, task4],
}
