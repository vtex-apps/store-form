interface ParseDateTimeParams {
  data: Record<string, any>
  properties: Record<string, unknown>
}

export const parseDateTimeFieldsData = ({
  data,
  properties,
}: ParseDateTimeParams) => {
  Object.entries(properties).forEach(([propertyKey, property]) => {
    if ((property as any)?.format === 'date-time' && data[propertyKey]) {
      data[propertyKey] = new Date(data[propertyKey]).toISOString()
    }
  })

  return data
}
