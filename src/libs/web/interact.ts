export const subscribeToInput = <T>(input: HTMLInputElement) => {
    const getValue = () => input.value as T

    return getValue
}
