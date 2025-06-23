const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={ className }
      style = {{ ...style, display: "block", background: "transparent", zIndex: 1 }} 
      onClick = { onClick }
    />
  );
}

export default NextArrow;