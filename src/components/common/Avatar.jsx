function Avatar({ src, name, size = "medium" }) {
  const initials = name
    ? name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className={`avatar avatar-${size}`}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        initials
      )}
    </div>
  );
}

export default Avatar;