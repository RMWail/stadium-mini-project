export const StatusBadge = ({ status }) => {
  let label = "";
  let color = "";

  switch (status) {
    case 0:
      label = "On queue";
      color = "#f59e0b"; // orange
      break;
    case -1:
      label = "Cancelled";
      color = "#ef4444"; // red
      break;
    case 1:
      label = "Confirmed";
      color = "#10b981"; // green
      break;
    default:
      label = "Unknown";
      color = "#6b7280"; // gray
  }

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "9999px",
        backgroundColor: color,
        color: "#fff",
        fontWeight: 600,
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
};
