export const ramdomNumber = (maxNumber?: number) => {
    return Math.round(Math.random() * (maxNumber || 100000))
}
