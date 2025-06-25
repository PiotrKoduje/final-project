const Detail = ({ label, value }) => {
  return (
    <div className="flex w-full p-1">
      <p className="w-1/3 font-bold md:ml-30 text-xs sm:text-sm lg:text-base">{ label }</p>
      <div className="w-2/3 flex flex-col xs:flex-row justify-end gap-x-2">
         { String(value).split(',').map((str, index) => 
          (<p className="uppercase border border-secondary px-2 py-1 last:md:mr-30 text-xs sm:text-sm lg:text-base" key={index}>{str}</p>)) }
      </div>
    </div>
  );
}
  
export default Detail;