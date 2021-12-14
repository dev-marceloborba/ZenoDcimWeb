import { he } from 'date-fns/locale'
import xlsx from 'xlsx'

export const readFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return new Promise((resolve) => {
        reader.onload = (e) => {
            const ab = e.target?.result
            const wb = xlsx.read(ab, { type: 'array' })

            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]

            const data = xlsx.utils.sheet_to_json(ws, { header: 1 }).filter((x: any) => x.length > 0)

            resolve(data)
        }
    })
}

export const exportFile = (headers: Array<any>, data: Array<any>, sheetName: string, filename: string) => {
    const dataToExport: any[][] = []
    // console.log(headers)
    // console.log(data)

    /*
        0: (5) ['Name', 'Type', 'Address', 'Size', 'Deadband']
        1: (5) ['Tag 1', 'Holding Register', 40001, 1, 3]
        2: (5) ['Tag 2', 'Holding Register', 40002, 1, 3]
        3: (5) ['Tag 3', 'Holding Register', 40003, 1, 3]
        4: (5) ['Tag 4', 'Holding Register', 40004, 1, 3]
    */

    const extractedHeader = headers.map((header) => header.label)
    dataToExport.push(extractedHeader)

    // console.log(extractedHeader)



    // console.log(dataKeys)

    // console.log(data)
    // const haha = data.map((row) => Object.values(row))
    // console.log(haha)
    const extractedData = data.map((row) => ([
        row.name,
        row.dataType,
        row.address,
        row.size,
        row.deadband
    ]))

    extractedData.forEach((value) => dataToExport.push(value))

    // dataToExport.push(extractedData)


    // dataKeys.forEach((key) => )
    // headers.forEach((header) => dataToExport.push(header.label))

    // console.log(dataToExport)
    const ws = xlsx.utils.aoa_to_sheet(dataToExport)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, sheetName)
    xlsx.writeFile(wb, `${filename}.xlsx`)
}