export * from "./html"

export const instantiateApp = (): HTMLElement => {
    const app: HTMLElement | null = document.getElementById("app")

    if (!app) throw new Error("Could not initialize app.")

    return app
}
