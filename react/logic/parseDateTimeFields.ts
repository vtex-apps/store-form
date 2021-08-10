interface ParseDateTimeParams {
  data: Record<string, any>
  properties: Record<string, unknown>
}

export const parseDateTimeFieldsData = ({
  data,
  properties,
}: ParseDateTimeParams) => {
  const parsedData = { ...data }
  Object.entries(properties).forEach(([propertyKey, property]) => {
    if ((property as any)?.format === 'date-time' && parsedData[propertyKey]) {
      parsedData[propertyKey] = new Date(parsedData[propertyKey]).toISOString()
    }
  })

  return parsedData
}
