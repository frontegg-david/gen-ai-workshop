export const getOverviewBlocks = (data: any) => () => {

  const date = new Date();
  const body = {
    timeOfDay: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    ...data
  }

  return fetch(`http://localhost:4000/overview`, { method: 'POST', body: JSON.stringify(body) }).then(res =>
    res.json()
  )
}
