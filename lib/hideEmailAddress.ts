function hideEmail(
  email: string,
  number: number = 8,
  skip: number = 3
): string {
  if (!email || !email.includes("@")) {
    return "Invalid email";
  }

  const [localPart, domain] = email.split("@");
  const visiblePart = localPart.slice(0, skip);
  const hiddenPart = "*".repeat(number);

  // Combine the parts
  return `${visiblePart}${hiddenPart}@${domain}`;
}

export default hideEmail;
