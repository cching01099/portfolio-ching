export default function SectionHeading({ children, className = "", size = "lg" }) {
  const sizeClass = size === "sm" ? "text-lg md:text-xl" : "text-2xl md:text-3xl";
  return (
    <h1 className={`${sizeClass} font-extrabold ${className}`}>
      <span className="inline-block rounded-lg bg-gray-50/25 backdrop-blur-md px-2 py-0.5 -mx-2">
        {children}
        <span className="text-blue-600">.</span>
      </span>
    </h1>
  );
}
