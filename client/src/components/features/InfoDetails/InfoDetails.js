import Detail from "../Detail/Detail";

const InfoDetails = ({country, grapeVariety, color, style, region, volume, alkohol, vintage}) => {

  return(
    <div className="flex flex-col w-full ">
      <Detail label='Kraj:' value={country} />
      <Detail label='Szczepy:' value={grapeVariety} />
      <Detail label='Kolor:' value={color} />
      <Detail label='Styl:' value={style} />
      <Detail label='Region:' value={region} />
      <Detail label='Pojemność:' value={volume} />
      <Detail label='Alkohol:' value={alkohol} />
      <Detail label='Rocznik:' value={vintage} />
    </div>
  )
}

export default InfoDetails;