export const whichCountry = (region) => {
  const regionMap = {
    francuskie: 'francja',
    hiszpańskie: 'hiszpania',
    portugalskie: 'portugalia',
    włoskie: 'włochy',
    wszystkie: 'wszystkie'
  }
  
  return regionMap[region]
}
