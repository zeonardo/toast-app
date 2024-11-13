export const getPositionOptions = (positions: string[]) : JSX.Element => {
  return <>{
    positions.map((position) => (
      <option key={position} value={position}>
        {position}
      </option>
    ))
  }</>
}