export const serviceResult = res => {
    const ret = {
        success: true,
        data: null,
        code: 0
    }
    return {
        ...ret,
        ...res,
    }
}