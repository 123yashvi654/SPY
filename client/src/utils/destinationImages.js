const destinationImages = {
  dubai: "/images/dubai.jpg",
  paris: "/images/paris.jpg",
  bali: "/images/bali.jpg",
  london: "/images/london.jpg",
};

// SAFE fallback
export function getDestinationImage(destination) {
  if (!destination || typeof destination !== "string") {
    return "/images/default.jpg";
  }
  const key = destination.toLowerCase().trim();
  return destinationImages[key] || "/images/default.jpg";
}

export function getActivityImage(activity) {
  if (!activity || typeof activity !== "string") {
    return "/images/default.jpg";
  }
  const key = activity.toLowerCase().trim();
  return destinationImages[key] || "/images/default.jpg";
}
