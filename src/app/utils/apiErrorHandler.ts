const getErrorMessage = (apiError: any) => {
    if (!apiError) return ''
    else {
        const { data } = apiError
        return data.data[0].message as string
    }
}

export default getErrorMessage