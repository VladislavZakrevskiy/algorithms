

export function isUndefined (object: any): object is undefined {
    if (typeof object === 'undefined') {
        return true
    }
    return false
}

